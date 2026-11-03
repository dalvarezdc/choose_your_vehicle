/**
 * Database CLI.
 *   pnpm run db:migrate              apply pending migrations
 *   pnpm run db:seed                 migrate + reload the catalog from src/data (always)
 *   pnpm run db:reset                delete the DB file, then migrate + seed
 *   pnpm run db:status               show applied migrations and dataset counts
 *   pnpm run db:tables               list tables/views with row counts
 *   pnpm run db:query -- "SELECT …"  run one read-only SQL statement (add --json for JSON)
 *   pnpm run db:export               dump the full catalog to data/export/variants.{json,csv}
 */
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { DEFAULT_DB_PATH, ROOT, migrate, openDb } from './db.ts'
import { SqliteVehicleRepo } from './repo.ts'
import { seed, seedIfStale } from './seed.ts'

const args = process.argv.slice(2).filter((a) => a !== '--')
const cmd = args[0]
const path = DEFAULT_DB_PATH

/** Read-only commands: never write, but build the DB first if it does not exist yet. */
function openReadOnly(): DatabaseSync {
  if (!existsSync(path)) {
    const db = openDb(path)
    migrate(db)
    seedIfStale(db)
    db.close()
  }
  return new DatabaseSync(path, { readOnly: true })
}

const csvCell = (v: unknown) => {
  const s = v === undefined || v === null ? '' : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

if (cmd === 'query' || cmd === 'tables' || cmd === 'export') {
  const db = openReadOnly()
  try {
    if (cmd === 'query') {
      const sql = args.slice(1).filter((a) => a !== '--json').join(' ').trim()
      if (!sql) throw new Error('usage: pnpm run db:query -- "SELECT * FROM variant_details LIMIT 5" [--json]')
      const rows = db.prepare(sql).all()
      if (args.includes('--json')) console.log(JSON.stringify(rows, null, 2))
      else console.table(rows)
      console.error(`${rows.length} rows`)
    } else if (cmd === 'tables') {
      const objs = db.prepare("SELECT name, type FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY type, name").all() as { name: string; type: string }[]
      console.table(objs.map((o) => ({ ...o, rows: (db.prepare(`SELECT COUNT(*) AS n FROM "${o.name}"`).get() as { n: number }).n })))
      console.log('columns of the flat view: ' + (db.prepare('PRAGMA table_info(variant_details)').all() as { name: string }[]).map((c) => c.name).join(', '))
    } else {
      const rows = db.prepare('SELECT * FROM variant_details ORDER BY brand, family, model_year, trim').all() as Record<string, unknown>[]
      const dir = join(ROOT, 'data', 'export')
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, 'variants.json'), JSON.stringify(rows, null, 2) + '\n')
      const cols = rows.length ? Object.keys(rows[0]) : []
      writeFileSync(join(dir, 'variants.csv'), [cols.join(','), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(','))].join('\n') + '\n')
      console.log(`exported ${rows.length} variants to data/export/variants.json and data/export/variants.csv`)
    }
  } catch (err) {
    console.error(`error: ${(err as Error).message}`)
    process.exitCode = 1
  } finally {
    db.close()
  }
} else {
  if (cmd === 'reset') {
    for (const suffix of ['', '-wal', '-shm']) rmSync(path + suffix, { force: true })
    console.log(`removed ${path}`)
  }
  const db = openDb(path)
  const applied = migrate(db)
  console.log(applied.length ? `applied: ${applied.join(', ')}` : 'migrations: up to date')

  switch (cmd) {
    case 'migrate':
      break
    case 'seed':
    case 'reset':
      console.log('seeded:', seed(db))
      break
    case 'status': {
      const versions = db.prepare('SELECT version, applied_at FROM schema_migrations ORDER BY version').all()
      console.log('migrations:', versions)
      console.log('dataset:', new SqliteVehicleRepo(db).meta())
      break
    }
    default:
      console.error('usage: node server/cli.ts <migrate|seed|reset|status|tables|query|export>')
      process.exitCode = 1
  }
  console.log(`database: ${path}`)
  db.close()
}
