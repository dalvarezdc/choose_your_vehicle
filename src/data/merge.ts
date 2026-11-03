/**
 * Applies monthly release batches (src/data/releases) on top of the hand-edited
 * brand files. Pure function: the brand files are never mutated.
 */
import { slugify } from './slug.ts'
import type { BrandData, ReleaseBatch, VariantInput } from './types.ts'

export function mergeReleases(base: BrandData[], releases: ReleaseBatch[]): BrandData[] {
  const out: BrandData[] = structuredClone(base)
  const problems: string[] = []
  for (const r of releases) {
    r.rows.forEach((row, i) => {
      const where = `release ${r.id} row ${i + 1} (${row.brand} ${row.family} ${row.year} ${row.trim}):`
      const { brand, country, family, bodyType, generation, generationStart, generationEnd, replace, ...variant } = row
      let b = out.find((x) => slugify(x.brand) === slugify(brand))
      if (!b) {
        if (!country) return problems.push(`${where} new brand "${brand}" needs "country"`)
        b = { brand, country, families: [] }
        out.push(b)
      }
      let f = b.families.find((x) => slugify(x.name) === slugify(family))
      if (!f) {
        if (!bodyType) return problems.push(`${where} new model "${family}" needs "bodyType" (SUV | Pickup)`)
        f = { name: family, bodyType, generations: [] }
        b.families.push(f)
      }
      let g = f.generations.find((x) => x.code.toLowerCase() === generation.toLowerCase())
      if (!g) {
        if (generationStart === undefined) return problems.push(`${where} new generation "${generation}" needs "generationStart"`)
        g = { code: generation, yearStart: generationStart, yearEnd: generationEnd ?? null, variants: [] }
        f.generations.push(g)
      } else if (generationEnd !== undefined && generationEnd !== g.yearEnd) {
        g.yearEnd = generationEnd // e.g. a generation that just ended production
      }
      const v: VariantInput = variant
      const existing = g.variants.findIndex((x) => x.year === v.year && x.trim.toLowerCase() === v.trim.toLowerCase())
      if (existing >= 0) {
        if (!replace) return problems.push(`${where} already exists — set "replace": true to overwrite it`)
        g.variants[existing] = v
      } else {
        if (replace) return problems.push(`${where} "replace" set but no existing variant with that year + trim`)
        g.variants.push(v)
      }
      return undefined
    })
  }
  if (problems.length) throw new Error(`Release data problems:\n  ${problems.join('\n  ')}`)
  return out
}
