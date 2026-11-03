/**
 * Database CLI.
 *   pnpm run db:migrate   apply pending migrations
 *   pnpm run db:seed      migrate + reload the catalog from src/data (always)
 *   pnpm run db:reset     delete the DB file, then migrate + seed
 *   pnpm run db:status    show applied migrations and dataset counts
 */
import { rmSync } from 'node:fs'
import { DEFAULT_DB_PATH, migrate, openDb } from './db.ts'
import { SqliteVehicleRepo } from './repo.ts'
import { seed } from './seed.ts'

const cmd = process.argv[2]
const path = DEFAULT_DB_PATH

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
    console.error('usage: node server/cli.ts <migrate|seed|reset|status>')
    process.exitCode = 1
}
console.log(`database: ${path}`)
db.close()
