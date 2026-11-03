import type { Vehicle } from '../data/types'
import { METRICS, PALETTE, bestValue, genRange } from '../lib/metrics'

interface Props {
  selected: Vehicle[]
  onRemove: (id: string) => void
}

export function CompareCards({ selected, onRemove }: Props) {
  if (selected.length === 0) {
    return (
      <section className="card span-2 compare-empty">
        <p className="empty">Pick a model, year and trim above, tick rows in the table, or click a dot in a chart to compare.</p>
      </section>
    )
  }
  return (
    <div className="compare-grid" style={{ ['--n' as string]: selected.length }}>
      {selected.map((v, i) => (
        <article key={v.id} className="card compare-card" style={{ borderTopColor: PALETTE[i % PALETTE.length] }}>
          <header className="compare-head">
            <div>
              <div className="brand">{v.brand} · {v.bodyType}</div>
              <h3>
                <span className="year">{v.year}</span> {v.family} <span className="gen">{v.generation}</span>
              </h3>
              <div className="veh-sub">{v.trim} · {v.engine}</div>
              <div className="veh-sub">
                {v.fuel} · {v.drivetrain}{v.transmission ? ` · ${v.transmission}` : ''} · gen. {genRange(v)}
              </div>
            </div>
            <button className="icon-btn" onClick={() => onRemove(v.id)} aria-label={`Remove ${v.year} ${v.brand} ${v.family} ${v.trim}`}>✕</button>
          </header>
          <div className="ring-row">
            <div className="score-ring" style={{ ['--pct' as string]: `${v.overallScore * 10}%` }}>
              <span>{v.overallScore.toFixed(1)}</span>
              <small>overall</small>
            </div>
            <div className="tags">
              <span className={`tag ${v.priceBasis}`}>{v.priceBasis === 'new' ? 'New price' : 'Used price today'}</span>
              {v.estimated ? <span className="tag est" title="UAE ballpark estimate, not a verified quote">Estimated</span> : <span className="tag ok">Verified</span>}
            </div>
          </div>
          <dl>
            {METRICS.filter((m) => m.key !== 'overallScore').map((m) => {
              const isBest = selected.length > 1 && bestValue(selected, m.key) === v[m.key]
              return (
                <div key={m.key} className={isBest ? 'best' : ''}>
                  <dt>{m.label}</dt>
                  <dd>{m.format(v[m.key])}{isBest && <span className="badge">best</span>}</dd>
                </div>
              )
            })}
          </dl>
          {(v.notes || v.source) && (
            <p className="note">
              {v.notes}
              {v.source && <> <span className="muted">Source: {v.source}</span></>}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}
