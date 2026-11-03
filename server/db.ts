/**
 * SQLite connection + migrations, using Node's built-in `node:sqlite` (no native
 * add-on to compile, nothing for pnpm to build).
 *
 * DATABASE_PATH overrides the file location (default: ./data/vehicles.db).
 */
import { DatabaseSync } from 'node:sqlite'
import { mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

/** Project root. Scripts are always run from it (pnpm / make / Docker WORKDIR). */
export const ROOT = resolve(process.env.APP_ROOT ?? process.cwd())
export const DEFAULT_DB_PATH = resolve(ROOT, process.env.DATABASE_PATH ?? 'data/vehicles.db')
const MIGRATIONS_DIR = join(ROOT, 'server', 'migrations', 'sqlite')

export type Db = DatabaseSync

export function openDb(path: string = DEFAULT_DB_PATH): Db {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true })
  const db = new DatabaseSync(path)
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 3000;')
  return db
}

export function transaction<T>(db: Db, fn: () => T): T {
  db.exec('BEGIN IMMEDIATE')
  try {
    const out = fn()
    db.exec('COMMIT')
    return out
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

/** Apply every not-yet-applied *.sql file in server/migrations/sqlite, in name order. */
export function migrate(db: Db): string[] {
  db.exec('CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TEXT NOT NULL)')
  const done = new Set(
    (db.prepare('SELECT version FROM schema_migrations').all() as { version: string }[]).map((r) => r.version),
  )
  const applied: string[] = []
  for (const file of readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql')).sort()) {
    if (done.has(file)) continue
    const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf8')
    transaction(db, () => {
      db.exec(sql)
      db.prepare('INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)').run(file, new Date().toISOString())
    })
    applied.push(file)
  }
  return applied
}
