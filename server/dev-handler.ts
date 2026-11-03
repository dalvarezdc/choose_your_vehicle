/** Node (req, res) handler for the Vite dev middleware. Reloaded by Vite when server/ or src/data changes. */
import { getRequestListener } from '@hono/node-server'
import { createApp } from './app.ts'
import { initDb } from './bootstrap.ts'
import { SqliteVehicleRepo } from './repo.ts'

const g = globalThis as { __cyvDb?: ReturnType<typeof initDb> }
g.__cyvDb?.close() // module was reloaded: drop the previous connection
g.__cyvDb = initDb()

export const handle = getRequestListener(createApp(new SqliteVehicleRepo(g.__cyvDb)).fetch)
