/**
 * Data-update module (pnpm only):
 *
 *   pnpm run data:validate                       check every brand file + release batch
 *   pnpm run data:summary                        counts per brand / model / year
 *   pnpm run data:template                       (re)write data/releases/TEMPLATE.csv + TEMPLATE.json
 *   pnpm run data:import -- <file.csv|json> [--id YYYY-MM] [--notes "..."] [--dry-run]
 *        validates the rows against the whole catalog, writes src/data/releases/<id>.ts,
 *        regenerates src/data/releases/index.ts and appends to data/CHANGELOG.md
 *   pnpm run data:update                         validate + reseed SQLite + db status
 *   make data-update FILE=path/to/new.csv        import + update in one go
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, appendFileSync } from 'node:fs'
import { basename, extname, join, resolve } from 'node:path'
import { BASE_BRANDS, BRANDS, DATA_LAST_UPDATED, RELEASES, flattenCatalog, vehicles } from '../src/data/index.ts'
import { mergeReleases } from '../src/data/merge.ts'
import type { ReleaseBatch, ReleaseRow } from '../src/data/types.ts'

const ROOT = resolve(process.env.APP_ROOT ?? process.cwd())
const RELEASES_DIR = join(ROOT, 'src', 'data', 'releases')
const CHANGELOG = join(ROOT, 'data', 'CHANGELOG.md')
const TEMPLATE_DIR = join(ROOT, 'data', 'releases')

/** Column order for CSV templates. Everything after `overallScore` is optional. */
const COLUMNS = [
  'brand', 'country', 'family', 'bodyType', 'generation', 'generationStart', 'generationEnd',
  'year', 'trim', 'engine', 'fuel', 'drivetrain', 'transmission', 'priceAed', 'priceBasis',
  'horsepower', 'torqueNm', 'realWorldKmPerL', 'duneScore', 'maintenanceScore', 'overallScore',
  'estimated', 'source', 'notes', 'replace',
] as const
const REQUIRED = ['brand', 'family', 'generation', 'year', 'trim', 'engine', 'fuel', 'drivetrain', 'priceAed', 'priceBasis', 'horsepower', 'torqueNm', 'realWorldKmPerL', 'duneScore', 'maintenanceScore', 'overallScore'] as const
const NUMERIC = new Set(['generationStart', 'generationEnd', 'year', 'priceAed', 'horsepower', 'torqueNm', 'realWorldKmPerL', 'duneScore', 'maintenanceScore', 'overallScore'])
const BOOLEAN = new Set(['estimated', 'replace'])

const args = process.argv.slice(2).filter((a) => a !== '--')
const cmd = args[0]
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? (args[i + 1] ?? '') : undefined
}
const has = (name: string) => args.includes(`--${name}`)
/** Local (box/Mac timezone) date as YYYY-MM-DD. */
const localDate = () => new Date().toLocaleDateString('sv-SE')

// ---------- CSV ----------
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  const endCell = () => {
    row.push(cell)
    cell = ''
  }
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (ch === '"') quoted = false
      else cell += ch
    } else if (ch === '"') quoted = true
    else if (ch === ',') endCell()
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      endCell()
      rows.push(row)
      row = []
    } else cell += ch
  }
  if (cell !== '' || row.length) {
    endCell()
    rows.push(row)
  }
  return rows.filter((r) => r.some((c) => c.trim() !== '') && !r[0]?.trim().startsWith('#'))
}
const csvCell = (v: unknown) => {
  const s = v === undefined || v === null ? '' : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** Turns loose CSV/JSON records into typed rows, collecting field-level problems. */
function coerceRows(records: Record<string, unknown>[]): { rows: ReleaseRow[]; problems: string[] } {
  const problems: string[] = []
  const rows = records.map((rec, i) => {
    const out: Record<string, unknown> = {}
    for (const [k0, raw] of Object.entries(rec)) {
      const k = k0.trim()
      if (!(COLUMNS as readonly string[]).includes(k)) {
        problems.push(`row ${i + 1}: unknown column "${k}" (allowed: ${COLUMNS.join(', ')})`)
        continue
      }
      if (raw === undefined || raw === null || (typeof raw === 'string' && raw.trim() === '')) {
        if (k === 'generationEnd' && raw === null) out[k] = null
        continue
      }
      if (NUMERIC.has(k)) {
        const s = String(raw).trim().toLowerCase()
        if (k === 'generationEnd' && (s === 'null' || s === 'now' || s === 'current')) out[k] = null
        else {
          const n = Number(String(raw).replace(/[_\s,]/g, ''))
          if (!Number.isFinite(n)) problems.push(`row ${i + 1}: ${k} "${raw}" is not a number`)
          else out[k] = n
        }
      } else if (BOOLEAN.has(k)) {
        out[k] = typeof raw === 'boolean' ? raw : ['true', '1', 'yes', 'y'].includes(String(raw).trim().toLowerCase())
      } else out[k] = String(raw).trim()
    }
    for (const k of REQUIRED) if (out[k] === undefined) problems.push(`row ${i + 1}: missing required "${k}"`)
    return out as unknown as ReleaseRow
  })
  return { rows, problems }
}

function readInput(file: string): Record<string, unknown>[] {
  const text = readFileSync(file, 'utf8')
  if (extname(file).toLowerCase() === '.json') {
    const parsed = JSON.parse(text) as unknown
    const list = Array.isArray(parsed) ? parsed : (parsed as { rows?: unknown }).rows
    if (!Array.isArray(list)) throw new Error('JSON must be an array of rows or { "rows": [...] }')
    return list as Record<string, unknown>[]
  }
  const [header, ...lines] = parseCsv(text)
  if (!header) throw new Error('CSV is empty')
  return lines.map((cells) => Object.fromEntries(header.map((h, i) => [h.trim(), cells[i] ?? ''])))
}

// ---------- release files ----------
const varName = (id: string) => `r_${id.replace(/[^a-zA-Z0-9]/g, '_')}`
function writeRelease(batch: ReleaseBatch) {
  mkdirSync(RELEASES_DIR, { recursive: true })
  const body = `// GENERATED by \`pnpm run data:import\` on ${batch.importedAt}. Edit with care;\n// re-importing with the same --id appends to this batch.\nimport type { ReleaseBatch } from '../types.ts'\n\nexport const release: ReleaseBatch = ${JSON.stringify(batch, null, 2)}\n`
  writeFileSync(join(RELEASES_DIR, `${batch.id}.ts`), body)
  const ids = readdirSync(RELEASES_DIR)
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
    .map((f) => basename(f, '.ts'))
    .sort()
  const index = [
    '// GENERATED by `pnpm run data:import` — lists every monthly release batch, oldest first.',
    '// Safe to edit by hand (e.g. to drop a bad batch), but prefer re-running the import.',
    "import type { ReleaseBatch } from '../types.ts'",
    ...ids.map((id) => `import { release as ${varName(id)} } from './${id}.ts'`),
    '',
    `export const RELEASES: ReleaseBatch[] = [${ids.map(varName).join(', ')}]`,
    '',
  ].join('\n')
  writeFileSync(join(RELEASES_DIR, 'index.ts'), index)
}

function logChangelog(batch: ReleaseBatch, added: ReleaseRow[]) {
  if (!existsSync(CHANGELOG)) writeFileSync(CHANGELOG, '# Data changelog\n\nNewest first is not enforced; each import appends an entry.\n')
  const lines = added.map((r) => `- ${r.replace ? 'updated' : 'added'}: ${r.brand} ${r.family} ${r.generation} ${r.year} ${r.trim}${r.source ? ` (source: ${r.source})` : ''}`)
  appendFileSync(CHANGELOG, `\n## ${batch.id} — imported ${localDate()}\n${batch.notes ? `\n${batch.notes}\n` : ''}\n${lines.join('\n')}\n`)
}

// ---------- reports ----------
function summary() {
  const byBrand = new Map<string, { models: Set<string>; variants: number; estimated: number }>()
  for (const v of vehicles) {
    const e = byBrand.get(v.brand) ?? { models: new Set(), variants: 0, estimated: 0 }
    e.models.add(v.family)
    e.variants++
    if (v.estimated) e.estimated++
    byBrand.set(v.brand, e)
  }
  console.table(
    [...byBrand].sort(([a], [b]) => a.localeCompare(b)).map(([brand, e]) => ({ brand, models: [...e.models].join(', '), variants: e.variants, estimated: e.estimated })),
  )
  const years = vehicles.map((v) => v.year)
  console.log(`${BRANDS.length} brands · ${new Set(vehicles.map((v) => v.familySlug)).size} models · ${vehicles.length} variants · years ${Math.min(...years)}–${Math.max(...years)} · ${RELEASES.length} release batches · last updated ${DATA_LAST_UPDATED}`)
}

/** Soft checks: numbers that are legal but probably typos. */
function warnings(list = vehicles): string[] {
  const w: string[] = []
  for (const v of list) {
    // Electric: km/L is a petrol-energy equivalent (8.9 kWh = 1 L) and multi-motor outputs run higher.
    const ev = v.fuel === 'electric'
    if (v.horsepower > (ev ? 1100 : 900) || v.horsepower < 80) w.push(`${v.id}: horsepower ${v.horsepower} looks unusual`)
    if (v.torqueNm > (ev ? 1600 : 1200) || v.torqueNm < 120) w.push(`${v.id}: torqueNm ${v.torqueNm} looks unusual`)
    if (v.realWorldKmPerL > (ev ? 70 : 20) || v.realWorldKmPerL < (ev ? 20 : 3)) w.push(`${v.id}: realWorldKmPerL ${v.realWorldKmPerL} looks unusual`)
    if (v.priceAed < 10000 || v.priceAed > 3_000_000) w.push(`${v.id}: priceAed ${v.priceAed} looks unusual`)
    if (v.estimated === false && !v.source) w.push(`${v.id}: estimated=false but no source`)
  }
  return w
}

function validate() {
  // Importing src/data already ran mergeReleases + flattenCatalog (they throw on hard errors).
  const w = warnings()
  for (const line of w) console.warn(`warn  ${line}`)
  console.log(`ok    ${vehicles.length} variants, ${BRANDS.length} brands, ${RELEASES.length} release batches, ${w.length} warnings, last updated ${DATA_LAST_UPDATED}`)
}

function importFile() {
  const file = args[1]
  if (!file || file.startsWith('--')) {
    console.error('usage: pnpm run data:import -- <file.csv|file.json> [--id YYYY-MM] [--notes "..."] [--dry-run]')
    process.exit(1)
  }
  const id = flag('id') ?? localDate().slice(0, 7)
  if (!/^\d{4}-\d{2}(-[a-z0-9-]+)?$/.test(id)) throw new Error(`--id "${id}" must look like YYYY-MM or YYYY-MM-suffix`)
  const { rows, problems } = coerceRows(readInput(resolve(file)))
  if (problems.length) throw new Error(`Input problems in ${file}:\n  ${problems.join('\n  ')}`)
  if (!rows.length) throw new Error(`${file} has no data rows`)

  const prior = RELEASES.find((r) => r.id === id)
  const batch: ReleaseBatch = {
    id,
    importedAt: new Date().toISOString(),
    notes: [prior?.notes, flag('notes')].filter(Boolean).join('\n') || undefined,
    rows: [...(prior?.rows ?? []), ...rows],
  }
  // Validate against the whole catalog exactly as the app will load it.
  const merged = mergeReleases(BASE_BRANDS, [...RELEASES.filter((r) => r.id !== id), batch])
  const next = flattenCatalog(merged)
  const known = new Set(vehicles.map((v) => v.id))
  const fresh = next.filter((v) => !known.has(v.id))
  for (const line of warnings(fresh)) console.warn(`warn  ${line}`)
  console.log(`${rows.length} rows OK → ${fresh.length} new variants, ${rows.filter((r) => r.replace).length} replacements; catalog would have ${next.length} variants`)
  if (has('dry-run')) return console.log('dry run: nothing written')
  writeRelease(batch)
  logChangelog(batch, rows)
  console.log(`wrote src/data/releases/${id}.ts, updated src/data/releases/index.ts and data/CHANGELOG.md`)
  console.log('next: pnpm run data:update   (or make data-update) to reseed SQLite')
}

function template() {
  mkdirSync(TEMPLATE_DIR, { recursive: true })
  const example: Record<string, unknown> = {
    brand: 'Nissan', country: 'Japan', family: 'Patrol', bodyType: 'SUV', generation: 'Y63', generationStart: 2025, generationEnd: '',
    year: 2027, trim: 'EXAMPLE — delete this row', engine: '3.5L twin-turbo V6 (VR35DDTT)', fuel: 'petrol', drivetrain: '4WD',
    transmission: '9-speed automatic', priceAed: 300000, priceBasis: 'new', horsepower: 425, torqueNm: 700, realWorldKmPerL: 7.5,
    duneScore: 8.5, maintenanceScore: 7.5, overallScore: 8.5, estimated: true, source: 'https://example.com/spec-sheet', notes: '', replace: false,
  }
  const csv = [
    '# One row per new year/trim. Lines starting with # are ignored. Optional: country, bodyType, generationStart/End (only for NEW brand/model/generation), transmission, estimated, source, notes, replace.',
    COLUMNS.join(','),
    COLUMNS.map((c) => csvCell(example[c])).join(','),
  ].join('\n')
  writeFileSync(join(TEMPLATE_DIR, 'TEMPLATE.csv'), csv + '\n')
  writeFileSync(join(TEMPLATE_DIR, 'TEMPLATE.json'), JSON.stringify({ rows: [{ ...example, generationEnd: null }] }, null, 2) + '\n')
  console.log('wrote data/releases/TEMPLATE.csv and data/releases/TEMPLATE.json (copy, fill in, then data:import)')
}

try {
  switch (cmd) {
    case 'validate':
      validate()
      break
    case 'summary':
      summary()
      break
    case 'import':
      importFile()
      break
    case 'template':
      template()
      break
    default:
      console.error('usage: node scripts/data.ts <validate|summary|import|template>')
      process.exitCode = 1
  }
} catch (err) {
  console.error(`error: ${(err as Error).message}`)
  process.exitCode = 1
}
