import { useMemo, useState } from 'react'
import type { Vehicle } from '../data/types'

interface Props {
  vehicles: Vehicle[]
  selectedIds: Set<string>
  full: boolean
  onAdd: (id: string) => void
}

/** Model -> year -> trim picker, so "2015 Patrol Y61" vs "2024 Patrol Y62" is two clicks each. */
export function ComparePicker({ vehicles, selectedIds, full, onAdd }: Props) {
  const families = useMemo(() => {
    const map = new Map<string, { slug: string; brand: string; family: string }>()
    for (const v of vehicles) map.set(v.familySlug, { slug: v.familySlug, brand: v.brand, family: v.family })
    return [...map.values()].sort((a, b) => `${a.brand} ${a.family}`.localeCompare(`${b.brand} ${b.family}`))
  }, [vehicles])
  const brands = [...new Set(families.map((f) => f.brand))]

  const [family, setFamily] = useState('nissan-patrol')
  const inFamily = vehicles.filter((v) => v.familySlug === family)
  const years = [...new Set(inFamily.map((v) => v.year))].sort((a, b) => b - a)
  const [yearState, setYear] = useState<number | null>(null)
  const year = yearState !== null && years.includes(yearState) ? yearState : years[0]
  const trims = inFamily.filter((v) => v.year === year)
  const [trimState, setTrim] = useState('')
  const trimId = trims.some((v) => v.id === trimState) ? trimState : trims[0]?.id ?? ''
  const already = selectedIds.has(trimId)

  return (
    <div className="picker card">
      <label className="field">
        <span>Model</span>
        <select value={family} onChange={(e) => setFamily(e.target.value)}>
          {brands.map((b) => (
            <optgroup key={b} label={b}>
              {families
                .filter((f) => f.brand === b)
                .map((f) => (
                  <option key={f.slug} value={f.slug}>{f.brand} {f.family}</option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>
      <label className="field narrow">
        <span>Year</span>
        <select value={year ?? ''} onChange={(e) => setYear(Number(e.target.value))}>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </label>
      <label className="field grow">
        <span>Generation · trim · engine</span>
        <select value={trimId} onChange={(e) => setTrim(e.target.value)}>
          {trims.map((v) => (
            <option key={v.id} value={v.id}>
              {v.generation} · {v.trim} · {v.engine}
            </option>
          ))}
        </select>
      </label>
      <button className="primary" disabled={!trimId || full || already} onClick={() => onAdd(trimId)}>
        {already ? 'Already added' : full ? 'Compare is full' : '+ Add to compare'}
      </button>
    </div>
  )
}
