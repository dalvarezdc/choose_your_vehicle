import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Serves the JSON API (server/app.ts, SQLite) at /api inside the Vite dev server,
 * so `pnpm run dev` is one process. Loaded through Vite's SSR loader: editing
 * src/data or server/ reloads the API (and reseeds the DB when data changed).
 */
function vehicleApi(): Plugin {
  return {
    name: 'vehicle-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api')) return next()
        try {
          const mod = (await server.ssrLoadModule('/server/dev-handler.ts')) as typeof import('./server/dev-handler.ts')
          await mod.handle(req, res)
        } catch (err) {
          next(err)
        }
      })
    },
  }
}

// `base: './'` keeps the build portable: works on Vercel, Netlify,
// GitHub Pages project sites (/<repo>/), Docker and the Node server.
export default defineConfig({
  base: './',
  plugins: [react(), vehicleApi()],
  build: {
    // ECharts (tree-shaken) is ~500 kB on its own; ~260 kB gzipped total is fine here.
    chunkSizeWarningLimit: 1000,
  },
})
