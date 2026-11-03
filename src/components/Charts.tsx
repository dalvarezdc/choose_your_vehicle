import type { EChartsOption } from 'echarts'
import type { Vehicle } from '../data/types'
import { METRICS, PALETTE, fullName, metricByKey, shortName, type NumericKey } from '../lib/metrics'
import type { ThemeColors } from '../lib/theme'
import { Chart } from './Chart'

const SCORE_KEYS: NumericKey[] = ['duneScore', 'maintenanceScore', 'overallScore']
const BAR_LIMIT = 15

function tooltipBase(c: ThemeColors) {
  return {
    backgroundColor: c.surface,
    borderColor: c.border,
    textStyle: { color: c.text },
  }
}

export function RadarCard({ selected, colors }: { selected: Vehicle[]; colors: ThemeColors }) {
  // Normalise everything to 0–10 so raw specs and scores share one radar.
  const maxOf = (k: NumericKey) => Math.max(...selected.map((v) => v[k]), 1)
  const minOf = (k: NumericKey) => Math.min(...selected.map((v) => v[k]))
  const axes: { key: NumericKey; name: string }[] = [
    ...SCORE_KEYS.map((k) => ({ key: k, name: metricByKey[k].short })),
    { key: 'horsepower', name: 'Power' },
    { key: 'torqueNm', name: 'Torque' },
    { key: 'realWorldKmPerL', name: 'Economy' },
    { key: 'priceAed', name: 'Value' },
  ]
  const norm = (v: Vehicle, k: NumericKey) => {
    if (SCORE_KEYS.includes(k)) return v[k]
    if (k === 'priceAed') return +(10 * (minOf(k) / v[k])).toFixed(2) // cheaper = higher
    return +(10 * (v[k] / maxOf(k))).toFixed(2)
  }
  const option: EChartsOption = {
    color: PALETTE,
    tooltip: { ...tooltipBase(colors), trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: colors.muted }, type: 'scroll' },
    radar: {
      indicator: axes.map((a) => ({ name: a.name, max: 10 })),
      radius: '62%',
      axisName: { color: colors.muted, fontSize: 12 },
      splitLine: { lineStyle: { color: colors.border } },
      splitArea: { areaStyle: { color: ['transparent'] } },
      axisLine: { lineStyle: { color: colors.border } },
    },
    series: [
      {
        type: 'radar',
        symbolSize: 5,
        emphasis: { lineStyle: { width: 3 } },
        data: selected.map((v) => ({
          name: fullName(v),
          value: axes.map((a) => norm(v, a.key)),
          areaStyle: { opacity: 0.12 },
          lineStyle: { width: 2 },
        })),
      },
    ],
    animationDuration: 500,
  }
  return (
    <section className="card">
      <header className="card-head">
        <h3>Score profile</h3>
        <span className="hint">Scores as-is; specs scaled 0–10 within your selection (Value = cheaper)</span>
      </header>
      {selected.length ? <Chart option={option} height={380} /> : <p className="empty">Select variants to compare.</p>}
    </section>
  )
}

/**
 * With many year/trim variants a full bar list is unreadable, so: your compare
 * selection when you have one, otherwise the top 15 of the filtered list.
 */
export function BarCard({
  metric,
  vehicles,
  selected,
  colors,
}: {
  metric: NumericKey
  vehicles: Vehicle[]
  selected: Vehicle[]
  colors: ThemeColors
}) {
  const m = metricByKey[metric]
  const cmp = (a: Vehicle, b: Vehicle) => (m.higherIsBetter ? b[metric] - a[metric] : a[metric] - b[metric])
  const useSelection = selected.length > 0
  const sorted = useSelection ? [...selected].sort(cmp) : [...vehicles].sort(cmp).slice(0, BAR_LIMIT)
  const colorOf = (v: Vehicle) => (useSelection ? PALETTE[selected.indexOf(v) % PALETTE.length] : colors.accent)
  const option: EChartsOption = {
    grid: { left: 8, right: 56, top: 8, bottom: 8, containLabel: true },
    tooltip: {
      ...tooltipBase(colors),
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      valueFormatter: (val) => m.format(Number(val)),
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: colors.muted, formatter: (v: number) => (metric === 'priceAed' ? `${v / 1000}k` : String(v)) },
      splitLine: { lineStyle: { color: colors.border, type: 'dashed' } },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: sorted.map(shortName),
      axisLabel: { color: colors.text, fontSize: 11, width: 220, overflow: 'truncate' },
      axisLine: { lineStyle: { color: colors.border } },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 18,
        data: sorted.map((v) => ({ value: v[metric], itemStyle: { borderRadius: [0, 6, 6, 0], color: colorOf(v) } })),
        label: {
          show: true,
          position: 'right',
          color: colors.muted,
          fontSize: 11,
          formatter: (p) => (metric === 'priceAed' ? `${Math.round(Number(p.value) / 1000)}k` : String(p.value)),
        },
      },
    ],
    animationDuration: 500,
  }
  return (
    <section className="card">
      <header className="card-head">
        <h3>{m.label}</h3>
        <span className="hint">
          {useSelection ? 'Your selection' : `Top ${Math.min(BAR_LIMIT, vehicles.length)} of ${vehicles.length} filtered`} · {m.unit} ·{' '}
          {m.higherIsBetter ? 'higher is better' : 'lower is better'}
        </span>
      </header>
      {sorted.length ? <Chart option={option} height={Math.max(200, sorted.length * 28 + 30)} /> : <p className="empty">No variants match the filters.</p>}
    </section>
  )
}

export function ScatterCard({
  vehicles,
  selectedIds,
  colors,
  onPick,
}: {
  vehicles: Vehicle[]
  selectedIds: Set<string>
  colors: ThemeColors
  onPick: (id: string) => void
}) {
  const anySelected = selectedIds.size > 0
  const option: EChartsOption = {
    grid: { left: 8, right: 24, top: 24, bottom: 8, containLabel: true },
    tooltip: {
      ...tooltipBase(colors),
      formatter: (p) => {
        const d = (p as unknown as { data: { name: string; value: number[] } }).data
        return `<b>${d.name}</b><br/>${metricByKey.priceAed.format(d.value[0])}<br/>Overall ${d.value[1]} · ${d.value[2]} hp<br/><i>click to compare</i>`
      },
    },
    xAxis: {
      type: 'value',
      name: 'Price (AED)',
      nameTextStyle: { color: colors.muted },
      scale: true,
      axisLabel: { color: colors.muted, formatter: (v: number) => `${v / 1000}k` },
      splitLine: { lineStyle: { color: colors.border, type: 'dashed' } },
    },
    yAxis: {
      type: 'value',
      name: 'Overall',
      nameTextStyle: { color: colors.muted },
      scale: true,
      axisLabel: { color: colors.muted },
      splitLine: { lineStyle: { color: colors.border, type: 'dashed' } },
    },
    series: [
      {
        type: 'scatter',
        data: vehicles.map((v) => ({
          id: v.id,
          name: fullName(v),
          value: [v.priceAed, v.overallScore, v.horsepower],
          itemStyle: { color: !anySelected || selectedIds.has(v.id) ? colors.accent : colors.dim, opacity: 0.9 },
          label: { show: vehicles.length <= 20 || selectedIds.has(v.id) },
        })),
        symbolSize: (val: number[]) => 6 + val[2] / 30,
        label: { position: 'top', color: colors.muted, fontSize: 10, formatter: (p) => p.name.split(' ').slice(0, 3).join(' ') },
      },
    ],
    animationDuration: 500,
  }
  return (
    <section className="card span-2">
      <header className="card-head">
        <h3>Value map</h3>
        <span className="hint">Price vs overall score · bubble size = horsepower · top-left is best value · click a dot to compare</span>
      </header>
      {vehicles.length ? (
        <Chart
          option={option}
          height={360}
          onEvents={{ click: (p) => onPick((p as { data: { id: string } }).data.id) }}
        />
      ) : (
        <p className="empty">No variants match the filters.</p>
      )}
    </section>
  )
}

/**
 * Model history: one metric across model years for a model family. One line per
 * generation + engine, so e.g. Patrol Y61 TB48 vs Y62 V8 vs Y63 twin-turbo read as
 * separate tracks. Click a point to add that year/trim to the comparison.
 */
export function HistoryCard({
  vehicles,
  families,
  family,
  onFamily,
  metric,
  onMetric,
  selectedIds,
  colors,
  onPick,
}: {
  vehicles: Vehicle[]
  families: { slug: string; label: string }[]
  family: string
  onFamily: (slug: string) => void
  metric: NumericKey
  onMetric: (k: NumericKey) => void
  selectedIds: Set<string>
  colors: ThemeColors
  onPick: (id: string) => void
}) {
  const m = metricByKey[metric]
  const rows = vehicles.filter((v) => v.familySlug === family).sort((a, b) => a.year - b.year)
  const groups = new Map<string, Vehicle[]>()
  for (const v of rows) {
    const key = `${v.generation} · ${v.engine}`
    groups.set(key, [...(groups.get(key) ?? []), v])
  }
  const years = rows.map((v) => v.year)
  const option: EChartsOption = {
    color: PALETTE,
    grid: { left: 8, right: 24, top: 24, bottom: 48, containLabel: true },
    legend: { bottom: 0, type: 'scroll', textStyle: { color: colors.muted } },
    tooltip: {
      ...tooltipBase(colors),
      trigger: 'item',
      formatter: (p) => {
        const d = (p as unknown as { data: { v: Vehicle } }).data.v
        return `<b>${fullName(d)}</b><br/>${d.engine}<br/>${m.label}: <b>${m.format(d[metric])}</b>${d.priceBasis === 'used' && metric === 'priceAed' ? ' (used today)' : ''}<br/><i>click to compare</i>`
      },
    },
    xAxis: {
      type: 'value',
      min: years.length ? Math.min(...years) - 1 : undefined,
      max: years.length ? Math.max(...years) + 1 : undefined,
      minInterval: 1,
      axisLabel: { color: colors.muted, formatter: (v: number) => String(v) },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      scale: true,
      name: m.unit,
      nameTextStyle: { color: colors.muted },
      axisLabel: { color: colors.muted, formatter: (v: number) => (metric === 'priceAed' ? `${v / 1000}k` : String(v)) },
      splitLine: { lineStyle: { color: colors.border, type: 'dashed' } },
    },
    series: [...groups.entries()].map(([name, list]) => ({
      type: 'line',
      name,
      data: list.map((v) => ({
        id: v.id,
        v,
        value: [v.year, v[metric]],
        symbolSize: selectedIds.has(v.id) ? 14 : 9,
      })),
      symbol: 'circle',
      lineStyle: { width: 2 },
      label: { show: rows.length <= 14, position: 'top', color: colors.muted, fontSize: 10, formatter: (p) => (p.data as { v: Vehicle }).v.trim },
    })),
    animationDuration: 500,
  }
  return (
    <section className="card span-2">
      <header className="card-head">
        <h3>Model history by year</h3>
        <div className="inline-controls">
          <label>
            <span className="sr-only">Model family</span>
            <select value={family} onChange={(e) => onFamily(e.target.value)}>
              {families.map((f) => (
                <option key={f.slug} value={f.slug}>{f.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Metric</span>
            <select value={metric} onChange={(e) => onMetric(e.target.value as NumericKey)}>
              {METRICS.map((x) => (
                <option key={x.key} value={x.key}>{x.label}</option>
              ))}
            </select>
          </label>
        </div>
      </header>
      <p className="hint tight">One line per generation + engine · click a point to add that year/trim to the comparison</p>
      {rows.length ? (
        <Chart option={option} height={340} onEvents={{ click: (p) => onPick((p as { data: { id: string } }).data.id) }} />
      ) : (
        <p className="empty">No variants for this model.</p>
      )}
    </section>
  )
}
