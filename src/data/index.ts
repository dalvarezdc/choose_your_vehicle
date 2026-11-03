/**
 * Catalog entry point. Source of truth for the database seed and the static
 * fallback the UI uses when no API is running (e.g. GitHub Pages).
 *
 * UPDATE EVERY ~6 MONTHS:
 *   1. Edit the brand files in ./brands (add the new model year as a new variant
 *      instead of overwriting the old one — history is the point).
 *   2. Bump DATA_LAST_UPDATED.
 *   3. `pnpm run db:seed` (the API also reseeds automatically when this data changes).
 *
 * Every figure is a UAE ballpark estimate unless the record says `estimated: false`
 * and names a `source`.
 */
import type { BrandData, Vehicle } from './types.ts'
import { ford } from './brands/ford.ts'
import { gmc } from './brands/gmc.ts'
import { infiniti } from './brands/infiniti.ts'
import { jeep } from './brands/jeep.ts'
import { jetour } from './brands/jetour.ts'
import { landRover } from './brands/land-rover.ts'
import { lexus } from './brands/lexus.ts'
import { nissan } from './brands/nissan.ts'
import { porsche } from './brands/porsche.ts'
import { ram } from './brands/ram.ts'
import { toyota } from './brands/toyota.ts'

export type { BrandData, Vehicle } from './types.ts'

export const DATA_LAST_UPDATED = '2026-11'

export const BRANDS: BrandData[] = [nissan, toyota, lexus, infiniti, jeep, ram, ford, gmc, landRover, porsche, jetour]

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** Flatten brand files into one row per year/trim, validating as we go. */
export function flattenCatalog(brands: BrandData[]): Vehicle[] {
  const out: Vehicle[] = []
  const ids = new Set<string>()
  const problems: string[] = []
  for (const b of brands) {
    for (const f of b.families) {
      for (const g of f.generations) {
        for (const v of g.variants) {
          const id = slugify(`${b.brand} ${f.name} ${g.code} ${v.year} ${v.trim}`)
          const where = `${id}:`
          if (ids.has(id)) problems.push(`${where} duplicate id (same brand/model/generation/year/trim twice)`)
          ids.add(id)
          if (v.year < g.yearStart || (g.yearEnd !== null && v.year > g.yearEnd))
            problems.push(`${where} year ${v.year} outside generation ${g.code} (${g.yearStart}–${g.yearEnd ?? 'now'})`)
          for (const k of ['duneScore', 'maintenanceScore', 'overallScore'] as const)
            if (v[k] < 0 || v[k] > 10) problems.push(`${where} ${k} must be 0–10`)
          for (const k of ['priceAed', 'horsepower', 'torqueNm', 'realWorldKmPerL'] as const)
            if (!(v[k] > 0)) problems.push(`${where} ${k} must be > 0`)
          out.push({
            id,
            brand: b.brand,
            brandSlug: slugify(b.brand),
            family: f.name,
            familySlug: slugify(`${b.brand} ${f.name}`),
            bodyType: f.bodyType,
            generation: g.code,
            generationStart: g.yearStart,
            generationEnd: g.yearEnd,
            year: v.year,
            trim: v.trim,
            engine: v.engine,
            fuel: v.fuel,
            drivetrain: v.drivetrain,
            transmission: v.transmission ?? null,
            priceAed: v.priceAed,
            priceBasis: v.priceBasis,
            horsepower: v.horsepower,
            torqueNm: v.torqueNm,
            realWorldKmPerL: v.realWorldKmPerL,
            duneScore: v.duneScore,
            maintenanceScore: v.maintenanceScore,
            overallScore: v.overallScore,
            estimated: v.estimated ?? true,
            source: v.source ?? null,
            notes: v.notes ?? null,
          })
        }
      }
    }
  }
  if (problems.length) throw new Error(`Vehicle data problems:\n  ${problems.join('\n  ')}`)
  return out
}

export const vehicles: Vehicle[] = flattenCatalog(BRANDS)
