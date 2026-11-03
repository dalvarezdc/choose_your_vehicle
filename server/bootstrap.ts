import { DEFAULT_DB_PATH, migrate, openDb, type Db } from './db.ts'
import { seedIfStale } from './seed.ts'

/** Open the DB, apply migrations, (re)seed if the data files changed. */
export function initDb(path: string = DEFAULT_DB_PATH, log = true): Db {
  const db = openDb(path)
  const applied = migrate(db)
  const seeded = seedIfStale(db)
  if (log) {
    if (applied.length) console.log(`[db] applied migrations: ${applied.join(', ')}`)
    if (seeded) console.log(`[db] seeded ${path} from src/data`)
  }
  return db
}
