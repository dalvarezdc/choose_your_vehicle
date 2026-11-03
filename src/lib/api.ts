import { useEffect, useState } from 'react'
import type { Vehicle } from '../data/types'

export type DataSource = 'api' | 'static'

export interface CatalogState {
  status: 'loading' | 'ready' | 'error'
  vehicles: Vehicle[]
  lastUpdated: string
  source: DataSource
  error?: string
}

/** Relative to the page, so it works at a domain root and under a sub-path. */
const apiUrl = (path: string) => new URL(`api/${path}`, document.baseURI).toString()

async function fromApi(): Promise<Omit<CatalogState, 'status'>> {
  const [list, meta] = await Promise.all([
    fetch(apiUrl('variants?limit=1000&sort=overallScore')).then((r) => {
      if (!r.ok || !r.headers.get('content-type')?.includes('json')) throw new Error(`API ${r.status}`)
      return r.json() as Promise<{ total: number; items: Vehicle[] }>
    }),
    fetch(apiUrl('meta')).then((r) => r.json() as Promise<{ lastUpdated: string | null }>),
  ])
  return { vehicles: list.items, lastUpdated: meta.lastUpdated ?? '', source: 'api' }
}

/** Static hosting (GitHub Pages, Vercel static) has no API: use the bundled catalog, loaded lazily. */
async function fromStatic(): Promise<Omit<CatalogState, 'status'>> {
  const m = await import('../data/index')
  return { vehicles: m.vehicles, lastUpdated: m.DATA_LAST_UPDATED, source: 'static' }
}

export function useCatalog(): CatalogState {
  const [state, setState] = useState<CatalogState>({ status: 'loading', vehicles: [], lastUpdated: '', source: 'api' })
  useEffect(() => {
    let alive = true
    fromApi()
      .catch(fromStatic)
      .then((d) => alive && setState({ status: 'ready', ...d }))
      .catch((e: unknown) => alive && setState((s) => ({ ...s, status: 'error', error: String(e) })))
    return () => {
      alive = false
    }
  }, [])
  return state
}
