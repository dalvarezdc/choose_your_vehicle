/**
 * Production server: JSON API at /api + the built SPA from ./dist.
 *   pnpm run build && pnpm start      -> http://localhost:8787
 * PORT, HOST and DATABASE_PATH env vars are honoured.
 */
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { createApp } from './app.ts'
import { initDb } from './bootstrap.ts'
import { ROOT } from './db.ts'
import { SqliteVehicleRepo } from './repo.ts'

const db = initDb()
const app = createApp(new SqliteVehicleRepo(db))

const dist = join(ROOT, 'dist')
if (existsSync(dist)) {
  app.use('/*', serveStatic({ root: './dist' }))
  app.get('*', serveStatic({ path: './dist/index.html' })) // SPA fallback
} else {
  app.get('/', (c) => c.text('API is running at /api. Run `pnpm run build` to also serve the dashboard here.'))
}

const port = Number(process.env.PORT ?? 8787)
const hostname = process.env.HOST ?? '0.0.0.0'
const server = serve({ fetch: app.fetch, port, hostname }, (info) => {
  console.log(`[server] http://localhost:${info.port}  (API: /api)`)
})

const shutdown = () => {
  server.close()
  db.close()
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
