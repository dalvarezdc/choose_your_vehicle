import type { Vehicle } from '../data/types'
import { DRIVE_HINT, DRIVE_LABEL, METRICS, bestValue, type NumericKey } from '../lib/metrics'

export type SortKey = NumericKey | 'name' | 'year'
export interface SortState {
  key: SortKey
  dir: 'asc' | 'desc'
}

interface Props {
  vehicles: Vehicle[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
  sort: SortState
  onSort: (key: SortKey) => void
  maxSelected: number
}

export function VehicleTable({ vehicles, selectedIds, onToggle, sort, onSort, maxSelected }: Props) {
  const arrow = (k: SortKey) => (sort.key === k ? (sort.dir === 'asc' ? '▲' : '▼') : '')
  const ariaSort = (k: SortKey) => (sort.key === k ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none')
  const full = selectedIds.size >= maxSelected
  const best = Object.fromEntries(METRICS.map((m) => [m.key, bestValue(vehicles, m.key)]))

  return (
    <section className="card span-2 table-card">
      <header className="card-head">
        <h3>All variants <span className="hint">({vehicles.length})</span></h3>
        <span className="hint">One row per model year + trim · click a column to sort · tick up to {maxSelected} to compare · ≈ = estimated figures</span>
      </header>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="sel-col"><span className="sr-only">Compare</span></th>
              <th aria-sort={ariaSort('name')}>
                <button className="th-btn" onClick={() => onSort('name')}>Vehicle {arrow('name')}</button>
              </th>
              <th className="num" aria-sort={ariaSort('year')}>
                <button className="th-btn" onClick={() => onSort('year')}>Year {arrow('year')}</button>
              </th>
              <th>Fuel</th>
              <th>Drive</th>
              {METRICS.map((m) => (
                <th key={m.key} className="num" aria-sort={ariaSort(m.key)}>
                  <button className="th-btn" onClick={() => onSort(m.key)} title={m.label}>
                    {m.short} {arrow(m.key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => {
              const checked = selectedIds.has(v.id)
              return (
                <tr key={v.id} className={checked ? 'selected' : ''} onClick={() => (checked || !full) && onToggle(v.id)}>
                  <td className="sel-col">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!checked && full}
                      onChange={() => onToggle(v.id)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Compare ${v.year} ${v.brand} ${v.family} ${v.generation} ${v.trim}`}
                    />
                  </td>
                  <td>
                    <div className="veh-name">
                      {v.brand} {v.family} <span className="gen">{v.generation}</span>
                      {v.estimated && <span className="est-mark" title="Estimated (UAE ballpark)">≈</span>}
                    </div>
                    <div className="veh-sub">{v.trim} · {v.engine}</div>
                  </td>
                  <td className="num">{v.year}</td>
                  <td>
                    <span className={`fuel ${v.fuel}`}>{v.fuel}</span>
                  </td>
                  <td>
                    <span className={`drive d${v.drivetrain}`} title={DRIVE_HINT[v.drivetrain]}>{DRIVE_LABEL[v.drivetrain]}</span>
                  </td>
                  {METRICS.map((m) => (
                    <td key={m.key} className={`num ${best[m.key] === v[m.key] ? 'best' : ''}`}>
                      {m.key === 'priceAed' ? (
                        <>
                          {v.priceAed.toLocaleString('en-AE')}
                          {v.priceBasis === 'used' && <span className="used" title="Used-market price today">u</span>}
                        </>
                      ) : m.key === 'curbWeightKg' ? (
                        v.curbWeightKg.toLocaleString('en-AE')
                      ) : m.key.endsWith('Score') || m.key === 'realWorldKmPerL' ? (
                        v[m.key].toFixed(1)
                      ) : (
                        v[m.key]
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan={METRICS.length + 5} className="empty">No variants match the filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
