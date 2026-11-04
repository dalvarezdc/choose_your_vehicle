/**
 * Read-side data access. The API only talks to the `VehicleRepo` interface, so a
 * Postgres implementation (see README "Moving to hosted Postgres") can be dropped in
 * without touching routes or the UI. All SQL here is portable: `?` placeholders
 * (convert to $1, $2… for Postgres) and the `variant_details` view.
 */
import type { Vehicle } from '../src/data/types.ts'
import type { Db } from './db.ts'

export interface VariantFilter {
  brand?: string[] // slugs or names
  family?: string[] // family slugs, e.g. nissan-patrol
  generation?: string[]
  year?: number[]
  yearFrom?: number
  yearTo?: number
  fuel?: string[]
  drivetrain?: string[]
  bodyType?: string[]
  priceMax?: number
  minDune?: number
  q?: string
  sort?: string
  order?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

export interface ModelSummary {
  brand: string
  brandSlug: string
  family: string
  familySlug: string
  bodyType: string
  generations: { code: string; yearStart: number; yearEnd: number | null; years: number[]; variantCount: number }[]
}

export interface DatasetMeta {
  lastUpdated: string | null
  dataHash: string | null
  seededAt: string | null
  counts: { brands: number; families: number; generations: number; variants: number }
  years: { min: number; max: number }
}

export interface VehicleRepo {
  meta(): DatasetMeta
  brands(): { slug: string; name: string; country: string | null; variantCount: number }[]
  models(brand?: string): ModelSummary[]
  years(): { year: number; variantCount: number }[]
  listVariants(f: VariantFilter): { total: number; items: Vehicle[] }
  getVariant(id: string): Vehicle | undefined
  getRawVariant(id: string): Record<string, unknown> | undefined
}

/** API sort key -> column. Whitelisted: never interpolate user input into SQL. */
export const SORT_COLUMNS: Record<string, string> = {
  year: 'model_year',
  price: 'price_aed',
  priceAed: 'price_aed',
  horsepower: 'horsepower',
  torqueNm: 'torque_nm',
  curbWeightKg: 'curb_weight_kg',
  weight: 'curb_weight_kg',
  realWorldKmPerL: 'km_per_l',
  duneScore: 'dune_score',
  maintenanceScore: 'maintenance_score',
  overallScore: 'overall_score',
  brand: 'brand',
  family: 'family',
}

export const MAX_LIMIT = 1000

interface DetailRow {
  id: string
  brand: string
  brand_slug: string
  family: string
  family_slug: string
  body_type: Vehicle['bodyType']
  generation: string
  generation_start: number
  generation_end: number | null
  model_year: number
  trim: string
  engine: string
  fuel: Vehicle['fuel']
  drivetrain: Vehicle['drivetrain']
  transmission: string | null
  price_aed: number
  price_basis: Vehicle['priceBasis']
  horsepower: number
  torque_nm: number
  curb_weight_kg: number
  km_per_l: number
  dune_score: number
  maintenance_score: number
  overall_score: number
  estimated: number | boolean
  source: string | null
  notes: string | null
}

export const toVehicle = (r: DetailRow): Vehicle => ({
  id: r.id,
  brand: r.brand,
  brandSlug: r.brand_slug,
  family: r.family,
  familySlug: r.family_slug,
  bodyType: r.body_type,
  generation: r.generation,
  generationStart: r.generation_start,
  generationEnd: r.generation_end,
  year: r.model_year,
  trim: r.trim,
  engine: r.engine,
  fuel: r.fuel,
  drivetrain: r.drivetrain,
  transmission: r.transmission,
  priceAed: Number(r.price_aed),
  priceBasis: r.price_basis,
  horsepower: Number(r.horsepower),
  torqueNm: Number(r.torque_nm),
  curbWeightKg: Number(r.curb_weight_kg),
  realWorldKmPerL: Number(r.km_per_l),
  duneScore: Number(r.dune_score),
  maintenanceScore: Number(r.maintenance_score),
  overallScore: Number(r.overall_score),
  estimated: Boolean(r.estimated),
  source: r.source,
  notes: r.notes,
})

type Param = string | number | null

/** Builds WHERE clause + params for a filter. Exported for tests / a Postgres repo. */
export function buildWhere(f: VariantFilter): { where: string; params: Param[] } {
  const clauses: string[] = []
  const params: Param[] = []
  const inList = (col: string, values: (string | number)[] | undefined, lower = false) => {
    if (!values?.length) return
    clauses.push(`${lower ? `LOWER(${col})` : col} IN (${values.map(() => '?').join(', ')})`)
    params.push(...values.map((v) => (lower && typeof v === 'string' ? v.toLowerCase() : v)))
  }
  if (f.brand?.length) {
    const ph = f.brand.map(() => '?').join(', ')
    clauses.push(`(brand_slug IN (${ph}) OR LOWER(brand) IN (${ph}))`)
    params.push(...f.brand.map((b) => b.toLowerCase()), ...f.brand.map((b) => b.toLowerCase()))
  }
  inList('family_slug', f.family, true)
  inList('generation', f.generation, true)
  inList('model_year', f.year)
  inList('fuel', f.fuel, true)
  inList('drivetrain', f.drivetrain?.map((d) => d.toUpperCase()))
  inList('body_type', f.bodyType, true)
  const cmp = (sql: string, value: number | undefined) => {
    if (value === undefined) return
    clauses.push(sql)
    params.push(value)
  }
  cmp('model_year >= ?', f.yearFrom)
  cmp('model_year <= ?', f.yearTo)
  cmp('price_aed <= ?', f.priceMax)
  cmp('dune_score >= ?', f.minDune)
  if (f.q?.trim()) {
    const like = `%${f.q.trim().toLowerCase()}%`
    clauses.push(
      "LOWER(brand || ' ' || family || ' ' || generation || ' ' || trim || ' ' || engine || ' ' || CAST(model_year AS TEXT)) LIKE ?",
    )
    params.push(like)
  }
  return { where: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', params }
}

export class SqliteVehicleRepo implements VehicleRepo {
  private readonly db: Db
  constructor(db: Db) {
    this.db = db
  }

  meta(): DatasetMeta {
    const kv = Object.fromEntries(
      (this.db.prepare('SELECT key, value FROM dataset_meta').all() as { key: string; value: string }[]).map((r) => [r.key, r.value]),
    )
    const c = this.db
      .prepare(
        `SELECT (SELECT COUNT(*) FROM brands) AS brands, (SELECT COUNT(*) FROM model_families) AS families,
                (SELECT COUNT(*) FROM generations) AS generations, (SELECT COUNT(*) FROM variants) AS variants,
                (SELECT MIN(model_year) FROM variants) AS min_year, (SELECT MAX(model_year) FROM variants) AS max_year`,
      )
      .get() as Record<string, number>
    return {
      lastUpdated: kv.last_updated ?? null,
      dataHash: kv.data_hash ?? null,
      seededAt: kv.seeded_at ?? null,
      counts: { brands: c.brands, families: c.families, generations: c.generations, variants: c.variants },
      years: { min: c.min_year, max: c.max_year },
    }
  }

  brands() {
    return this.db
      .prepare(
        `SELECT b.slug, b.name, b.country, COUNT(v.id) AS variantCount
         FROM brands b
         LEFT JOIN model_families f ON f.brand_id = b.id
         LEFT JOIN generations g ON g.family_id = f.id
         LEFT JOIN variants v ON v.generation_id = g.id
         GROUP BY b.id ORDER BY b.name`,
      )
      .all() as { slug: string; name: string; country: string | null; variantCount: number }[]
  }

  models(brand?: string): ModelSummary[] {
    const rows = this.db
      .prepare(
        `SELECT brand, brand_slug, family, family_slug, body_type, generation, generation_start, generation_end,
                model_year, COUNT(*) AS n
         FROM variant_details
         ${brand ? 'WHERE brand_slug = ? OR LOWER(brand) = ?' : ''}
         GROUP BY family_slug, generation, model_year
         ORDER BY brand, family, generation_start, model_year`,
      )
      .all(...(brand ? [brand.toLowerCase(), brand.toLowerCase()] : [])) as unknown as (DetailRow & { n: number })[]
    const out = new Map<string, ModelSummary>()
    for (const r of rows) {
      let m = out.get(r.family_slug)
      if (!m) {
        m = { brand: r.brand, brandSlug: r.brand_slug, family: r.family, familySlug: r.family_slug, bodyType: r.body_type, generations: [] }
        out.set(r.family_slug, m)
      }
      let g = m.generations.find((x) => x.code === r.generation)
      if (!g) {
        g = { code: r.generation, yearStart: r.generation_start, yearEnd: r.generation_end, years: [], variantCount: 0 }
        m.generations.push(g)
      }
      g.years.push(r.model_year)
      g.variantCount += Number(r.n)
    }
    return [...out.values()]
  }

  years() {
    return this.db
      .prepare('SELECT model_year AS year, COUNT(*) AS variantCount FROM variants GROUP BY model_year ORDER BY model_year')
      .all() as { year: number; variantCount: number }[]
  }

  listVariants(f: VariantFilter) {
    const { where, params } = buildWhere(f)
    const col = SORT_COLUMNS[f.sort ?? ''] ?? 'overall_score'
    const dir = f.order === 'asc' ? 'ASC' : 'DESC'
    const limit = Math.min(Math.max(f.limit ?? 200, 1), MAX_LIMIT)
    const offset = Math.max(f.offset ?? 0, 0)
    const { total } = this.db.prepare(`SELECT COUNT(*) AS total FROM variant_details ${where}`).get(...params) as { total: number }
    const items = (
      this.db
        .prepare(`SELECT * FROM variant_details ${where} ORDER BY ${col} ${dir}, brand, family, model_year DESC, trim LIMIT ? OFFSET ?`)
        .all(...params, limit, offset) as unknown as DetailRow[]
    ).map(toVehicle)
    return { total, items }
  }

  getVariant(id: string) {
    const r = this.db.prepare('SELECT * FROM variant_details WHERE id = ?').get(id) as DetailRow | undefined
    return r && toVehicle(r)
  }

  getRawVariant(id: string) {
    return this.db.prepare('SELECT * FROM variants WHERE id = ?').get(id) as Record<string, unknown> | undefined
  }
}
