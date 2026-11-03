import { useMemo, useState } from 'react'
import type { Fuel, Vehicle } from './data/types'
import { useCatalog } from './lib/api'
import { useTheme, THEME_COLORS } from './lib/theme'
import { BAR_METRICS, metricByKey, type NumericKey } from './lib/metrics'
import { VehicleTable, type SortKey, type SortState } from './components/VehicleTable'
import { CompareCards } from './components/CompareCards'
import { ComparePicker } from './components/ComparePicker'
import { BarCard, HistoryCard, RadarCard, ScatterCard } from './components/Charts'

const MAX_SELECTED = 4
const FUELS: Fuel[] = ['petrol', 'diesel', 'hybrid']
const DEFAULT_SELECTED = ['nissan-patrol-y61-2015-super-safari', 'nissan-patrol-y62-2024-le-platinum', 'toyota-land-cruiser-j300-2025-gxr-twin-turbo']
const aed = (n: number) => `AED ${n.toLocaleString('en-AE')}`
const toggleIn = <T,>(s: Set<T>, x: T) => {
  const n = new Set(s)
  if (n.has(x)) n.delete(x)
  else n.add(x)
  return n
}

export default function App() {
  const catalog = useCatalog()
  if (catalog.status !== 'ready') {
    return (
      <div className="app">
        <p className="empty">{catalog.status === 'loading' ? 'Loading vehicle data…' : `Could not load data: ${catalog.error}`}</p>
      </div>
    )
  }
  return <Dashboard all={catalog.vehicles} lastUpdated={catalog.lastUpdated} source={catalog.source} />
}

function Dashboard({ all, lastUpdated, source }: { all: Vehicle[]; lastUpdated: string; source: 'api' | 'static' }) {
  const { theme, toggle } = useTheme()
  const colors = THEME_COLORS[theme]

  const bounds = useMemo(() => {
    const years = all.map((v) => v.year)
    const prices = all.map((v) => v.priceAed)
    const families = new Map<string, { slug: string; label: string; brand: string }>()
    for (const v of all) families.set(v.familySlug, { slug: v.familySlug, label: `${v.brand} ${v.family}`, brand: v.brand })
    return {
      yearMin: Math.min(...years),
      yearMax: Math.max(...years),
      priceMax: Math.ceil(Math.max(...prices) / 10000) * 10000,
      priceMin: Math.floor(Math.min(...prices) / 10000) * 10000,
      brands: [...new Set(all.map((v) => v.brand))],
      families: [...families.values()].sort((a, b) => a.label.localeCompare(b.label)),
    }
  }, [all])

  const [query, setQuery] = useState('')
  const [brands, setBrands] = useState<Set<string>>(new Set())
  const [family, setFamily] = useState('')
  const [fuels, setFuels] = useState<Set<Fuel>>(new Set())
  const [yearFrom, setYearFrom] = useState(bounds.yearMin)
  const [yearTo, setYearTo] = useState(bounds.yearMax)
  const [priceMode, setPriceMode] = useState<'all' | 'new' | 'used'>('all')
  const [maxPrice, setMaxPrice] = useState(bounds.priceMax)
  const [minDune, setMinDune] = useState(0)
  const [sort, setSort] = useState<SortState>({ key: 'overallScore', dir: 'desc' })
  const [selected, setSelected] = useState<string[]>(() => DEFAULT_SELECTED.filter((id) => all.some((v) => v.id === id)))
  const [historyFamily, setHistoryFamily] = useState('nissan-patrol')
  const [historyMetric, setHistoryMetric] = useState<NumericKey>('horsepower')

  const familyOptions = bounds.families.filter((f) => brands.size === 0 || brands.has(f.brand))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = all.filter(
      (v) =>
        (brands.size === 0 || brands.has(v.brand)) &&
        (!family || v.familySlug === family) &&
        (fuels.size === 0 || fuels.has(v.fuel)) &&
        v.year >= yearFrom &&
        v.year <= yearTo &&
        (priceMode === 'all' || v.priceBasis === priceMode) &&
        v.priceAed <= maxPrice &&
        v.duneScore >= minDune &&
        (!q || `${v.year} ${v.brand} ${v.family} ${v.generation} ${v.trim} ${v.engine}`.toLowerCase().includes(q)),
    )
    const dir = sort.dir === 'asc' ? 1 : -1
    return list.sort((a, b) => {
      if (sort.key === 'name') return dir * `${a.brand} ${a.family} ${a.year}`.localeCompare(`${b.brand} ${b.family} ${b.year}`)
      if (sort.key === 'year') return dir * (a.year - b.year) || b.overallScore - a.overallScore
      return dir * (a[sort.key] - b[sort.key])
    })
  }, [all, query, brands, family, fuels, yearFrom, yearTo, priceMode, maxPrice, minDune, sort])

  const byId = useMemo(() => new Map(all.map((v) => [v.id, v])), [all])
  const selectedIds = useMemo(() => new Set(selected), [selected])
  const selectedVehicles = selected.map((id) => byId.get(id)).filter((v): v is Vehicle => !!v)
  const full = selected.length >= MAX_SELECTED

  const toggleSelect = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= MAX_SELECTED ? s : [...s, id]))
  const addSelect = (id: string) => setSelected((s) => (s.includes(id) || s.length >= MAX_SELECTED ? s : [...s, id]))

  const onSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: key === 'name' || (key !== 'year' && !metricByKey[key].higherIsBetter) ? 'asc' : 'desc' },
    )

  const resetFilters = () => {
    setQuery('')
    setBrands(new Set())
    setFamily('')
    setFuels(new Set())
    setYearFrom(bounds.yearMin)
    setYearTo(bounds.yearMax)
    setPriceMode('all')
    setMaxPrice(bounds.priceMax)
    setMinDune(0)
  }
  const filtersActive =
    query || brands.size || family || fuels.size || yearFrom !== bounds.yearMin || yearTo !== bounds.yearMax ||
    priceMode !== 'all' || maxPrice !== bounds.priceMax || minDune > 0

  const top3 = () => setSelected(filtered.slice().sort((a, b) => b.overallScore - a.overallScore).slice(0, 3).map((v) => v.id))
  const years = Array.from({ length: bounds.yearMax - bounds.yearMin + 1 }, (_, i) => bounds.yearMin + i)

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>
            Choose Your <span className="accent">Vehicle</span>
          </h1>
          <p className="sub">
            UAE 4x4 comparison · {all.length} year/trim variants · {bounds.families.length} models · data updated {lastUpdated}
            <span className={`src ${source}`} title={source === 'api' ? 'Loaded from the local API (SQLite)' : 'No API reachable: using the bundled snapshot'}>
              {source === 'api' ? 'Live API' : 'Static snapshot'}
            </span>
          </p>
        </div>
        <button className="theme-btn" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? '☀︎ Light' : '☾ Dark'}
        </button>
      </header>

      <section className="filters card">
        <label className="field grow">
          <span>Search</span>
          <input type="search" placeholder="Patrol 2015, Raptor, V8, Cayenne…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <label className="field">
          <span>Model</span>
          <select value={family} onChange={(e) => setFamily(e.target.value)}>
            <option value="">All models</option>
            {familyOptions.map((f) => (
              <option key={f.slug} value={f.slug}>{f.label}</option>
            ))}
          </select>
        </label>
        <div className="field">
          <span>Model years · {yearFrom}–{yearTo}</span>
          <div className="year-range">
            <select aria-label="From year" value={yearFrom} onChange={(e) => { const y = +e.target.value; setYearFrom(y); if (y > yearTo) setYearTo(y) }}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <span className="muted">to</span>
            <select aria-label="To year" value={yearTo} onChange={(e) => { const y = +e.target.value; setYearTo(y); if (y < yearFrom) setYearFrom(y) }}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <span>Price basis</span>
          <div className="chips">
            {(['all', 'new', 'used'] as const).map((p) => (
              <button key={p} className={`chip ${priceMode === p ? 'on' : ''}`} aria-pressed={priceMode === p} onClick={() => setPriceMode(p)}>
                {p === 'all' ? 'All' : p === 'new' ? 'New' : 'Used'}
              </button>
            ))}
          </div>
        </div>
        <div className="field wide">
          <span>Brand</span>
          <div className="chips">
            {bounds.brands.map((b) => (
              <button key={b} className={`chip ${brands.has(b) ? 'on' : ''}`} aria-pressed={brands.has(b)} onClick={() => { setBrands((s) => toggleIn(s, b)); setFamily('') }}>
                {b}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span>Fuel</span>
          <div className="chips">
            {FUELS.filter((f) => all.some((v) => v.fuel === f)).map((f) => (
              <button key={f} className={`chip ${fuels.has(f) ? 'on' : ''}`} aria-pressed={fuels.has(f)} onClick={() => setFuels((s) => toggleIn(s, f))}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <label className="field">
          <span>Max price · {aed(maxPrice)}</span>
          <input type="range" min={bounds.priceMin} max={bounds.priceMax} step={5000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
        </label>
        <label className="field">
          <span>Min dune score · {minDune.toFixed(1)}</span>
          <input type="range" min={0} max={10} step={0.5} value={minDune} onChange={(e) => setMinDune(+e.target.value)} />
        </label>
        <div className="field actions">
          <button className="ghost" onClick={resetFilters} disabled={!filtersActive}>Reset filters</button>
          <button className="ghost" onClick={top3} disabled={!filtered.length}>Top 3 (filtered)</button>
          <button className="ghost" onClick={() => setSelected([])} disabled={!selected.length}>Clear compare</button>
        </div>
      </section>

      <div className="section-title">
        <h2>Side-by-side</h2>
        <span className="hint">{selected.length}/{MAX_SELECTED} selected · pick any model year, e.g. 2015 Patrol Y61 vs 2024 Patrol Y62</span>
      </div>
      <ComparePicker vehicles={all} selectedIds={selectedIds} full={full} onAdd={addSelect} />
      <CompareCards selected={selectedVehicles} onRemove={toggleSelect} />

      <div className="grid">
        <RadarCard selected={selectedVehicles} colors={colors} />
        <HistoryCard
          vehicles={all}
          families={bounds.families}
          family={historyFamily}
          onFamily={setHistoryFamily}
          metric={historyMetric}
          onMetric={setHistoryMetric}
          selectedIds={selectedIds}
          colors={colors}
          onPick={addSelect}
        />
        <ScatterCard vehicles={filtered} selectedIds={selectedIds} colors={colors} onPick={addSelect} />
        <VehicleTable vehicles={filtered} selectedIds={selectedIds} onToggle={toggleSelect} sort={sort} onSort={onSort} maxSelected={MAX_SELECTED} />
        {BAR_METRICS.map((k) => (
          <BarCard key={k} metric={k} vehicles={filtered} selected={selectedVehicles} colors={colors} />
        ))}
      </div>

      <footer className="foot">
        Figures are UAE ballpark estimates (≈) for comparison only; “u” prices are today’s used market — verify with dealers before buying.
        Edit <code>src/data/brands/*.ts</code> to update · raw data at <code>/api</code> when running locally.
      </footer>
    </div>
  )
}
