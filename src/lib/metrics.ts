import type { Vehicle } from '../data/types'

export type NumericKey =
  | 'priceAed'
  | 'horsepower'
  | 'torqueNm'
  | 'realWorldKmPerL'
  | 'duneScore'
  | 'maintenanceScore'
  | 'overallScore'

export interface Metric {
  key: NumericKey
  label: string
  short: string
  unit: string
  /** true when a higher value is better */
  higherIsBetter: boolean
  format: (v: number) => string
}

const aed = new Intl.NumberFormat('en-AE', { maximumFractionDigits: 0 })

export const METRICS: Metric[] = [
  { key: 'priceAed', label: 'Price', short: 'Price', unit: 'AED', higherIsBetter: false, format: (v) => `AED ${aed.format(v)}` },
  { key: 'horsepower', label: 'Horsepower', short: 'HP', unit: 'hp', higherIsBetter: true, format: (v) => `${v} hp` },
  { key: 'torqueNm', label: 'Torque', short: 'Torque', unit: 'Nm', higherIsBetter: true, format: (v) => `${v} Nm` },
  { key: 'realWorldKmPerL', label: 'Real-world economy (UAE)', short: 'km/L', unit: 'km/L', higherIsBetter: true, format: (v) => `${v.toFixed(1)} km/L` },
  { key: 'duneScore', label: 'Dune score', short: 'Dunes', unit: '/10', higherIsBetter: true, format: (v) => v.toFixed(1) },
  { key: 'maintenanceScore', label: 'Maintenance score', short: 'Maint.', unit: '/10', higherIsBetter: true, format: (v) => v.toFixed(1) },
  { key: 'overallScore', label: 'Overall score', short: 'Overall', unit: '/10', higherIsBetter: true, format: (v) => v.toFixed(1) },
]

export const metricByKey = Object.fromEntries(METRICS.map((m) => [m.key, m])) as Record<NumericKey, Metric>

/** "2015 Nissan Patrol Y61 Super Safari" */
export const fullName = (v: Vehicle) => `${v.year} ${v.brand} ${v.family} ${v.generation} ${v.trim}`
/** Shorter label for chart axes: "2015 Patrol Y61 Super Safari" */
export const shortName = (v: Vehicle) => `${v.year} ${v.family} ${v.generation} ${v.trim}`
export const genRange = (v: Pick<Vehicle, 'generationStart' | 'generationEnd'>) => `${v.generationStart}–${v.generationEnd ?? 'now'}`

/** Best value of a metric among a set of vehicles. */
export function bestValue(list: Vehicle[], key: NumericKey): number | undefined {
  if (list.length === 0) return undefined
  const values = list.map((v) => v[key])
  return metricByKey[key].higherIsBetter ? Math.max(...values) : Math.min(...values)
}

export const PALETTE = ['#f97316', '#38bdf8', '#a78bfa', '#34d399', '#f472b6', '#facc15']

/** Raw specs shown as bar charts (scores live in the radar). */
export const BAR_METRICS: NumericKey[] = ['priceAed', 'horsepower', 'torqueNm', 'realWorldKmPerL']
