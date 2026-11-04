/**
 * Read-only JSON API (Hono). Mounted at /api by the Vite dev server (see
 * vite.config.ts) and by the production server (server/index.ts).
 */
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { MAX_LIMIT, SORT_COLUMNS, type VariantFilter, type VehicleRepo } from './repo.ts'

const list = (v: string | undefined) =>
  v
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean)
const int = (v: string | undefined) => {
  if (v === undefined || v === '') return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

export function createApi(repo: VehicleRepo): Hono {
  const api = new Hono()
  api.use('*', cors({ origin: '*', allowMethods: ['GET', 'OPTIONS'] }))
  api.use('*', async (c, next) => {
    await next()
    if (c.res.status === 200) c.header('Cache-Control', 'public, max-age=60')
  })

  api.get('/', (c) =>
    c.json({
      endpoints: {
        'GET /api/health': 'liveness + dataset version',
        'GET /api/meta': 'counts, year range, last data update',
        'GET /api/brands': 'brands with variant counts',
        'GET /api/models?brand=': 'model families -> generations -> available years',
        'GET /api/models/:familySlug': 'one family with every year/trim variant (oldest first)',
        'GET /api/years': 'model years with variant counts',
        'GET /api/variants': 'filter: brand, family, generation, year, yearFrom, yearTo, fuel, drivetrain (4WD = low-range 4x4, AWD, RWD, FWD), bodyType, priceMax, minDune, q; sort, order, limit, offset',
        'GET /api/variants/:id': 'one variant (flattened)',
        'GET /api/variants/:id/raw': 'the raw `variants` table row',
      },
      sortKeys: Object.keys(SORT_COLUMNS),
      maxLimit: MAX_LIMIT,
    }),
  )

  api.get('/health', (c) => {
    const m = repo.meta()
    return c.json({ status: 'ok', variants: m.counts.variants, dataHash: m.dataHash, lastUpdated: m.lastUpdated })
  })
  api.get('/meta', (c) => c.json(repo.meta()))
  api.get('/brands', (c) => c.json(repo.brands()))
  api.get('/years', (c) => c.json(repo.years()))
  api.get('/models', (c) => c.json(repo.models(c.req.query('brand'))))
  api.get('/models/:familySlug', (c) => {
    const slug = c.req.param('familySlug').toLowerCase()
    const model = repo.models().find((m) => m.familySlug === slug)
    if (!model) return c.json({ error: 'model family not found', familySlug: slug }, 404)
    const { items } = repo.listVariants({ family: [slug], sort: 'year', order: 'asc', limit: MAX_LIMIT })
    return c.json({ ...model, variants: items })
  })

  api.get('/variants', (c) => {
    const q = c.req.query()
    const yearList = list(q.year)?.map(Number).filter(Number.isFinite)
    const f: VariantFilter = {
      brand: list(q.brand),
      family: list(q.family),
      generation: list(q.generation),
      year: yearList,
      yearFrom: int(q.yearFrom),
      yearTo: int(q.yearTo),
      fuel: list(q.fuel),
      drivetrain: list(q.drivetrain),
      bodyType: list(q.bodyType),
      priceMax: int(q.priceMax),
      minDune: int(q.minDune),
      q: q.q,
      sort: q.sort,
      order: q.order === 'asc' ? 'asc' : 'desc',
      limit: int(q.limit),
      offset: int(q.offset),
    }
    if (f.sort && !(f.sort in SORT_COLUMNS)) return c.json({ error: `unknown sort key "${f.sort}"`, sortKeys: Object.keys(SORT_COLUMNS) }, 400)
    const { total, items } = repo.listVariants(f)
    return c.json({ total, limit: Math.min(f.limit ?? 200, MAX_LIMIT), offset: f.offset ?? 0, items })
  })
  api.get('/variants/:id', (c) => {
    const v = repo.getVariant(c.req.param('id'))
    return v ? c.json(v) : c.json({ error: 'variant not found' }, 404)
  })
  api.get('/variants/:id/raw', (c) => {
    const v = repo.getRawVariant(c.req.param('id'))
    return v ? c.json(v) : c.json({ error: 'variant not found' }, 404)
  })

  api.notFound((c) => c.json({ error: 'not found', hint: 'GET /api for the endpoint list' }, 404))
  api.onError((err, c) => {
    console.error('[api]', err)
    return c.json({ error: 'internal error' }, 500)
  })
  return api
}

/** Root app: API under /api. */
export function createApp(repo: VehicleRepo): Hono {
  const app = new Hono()
  app.route('/api', createApi(repo))
  return app
}
