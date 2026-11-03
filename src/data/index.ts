/**
 * Catalog entry point. Source of truth for the database seed and the static
 * fallback the UI uses when no API is running (e.g. GitHub Pages).
 *
 * TWO WAYS TO UPDATE (see README "Updating the data"):
 *   A. Monthly releases: put new variants in a CSV/JSON and run
 *      `make data-update FILE=path/to/new.csv` (validates, writes src/data/releases/<YYYY-MM>.ts,
 *      logs data/CHANGELOG.md, reseeds SQLite).
 *   B. Bigger edits: change the brand files in ./brands directly (add a new model year as a
 *      new variant instead of overwriting the old one — history is the point), bump
 *      BASE_DATA_UPDATED, then `make data-update`.
 *
 * Every figure is a UAE ballpark estimate unless the record says `estimated: false`
 * and names a `source`.
 */
import type { BrandData, Vehicle } from './types.ts'
import { mergeReleases } from './merge.ts'
import { RELEASES } from './releases/index.ts'
import { slugify } from './slug.ts'
import { bmw } from './brands/bmw.ts'
import { cadillac } from './brands/cadillac.ts'
import { changan } from './brands/changan.ts'
import { chevrolet } from './brands/chevrolet.ts'
import { geely } from './brands/geely.ts'
import { haval } from './brands/haval.ts'
import { hyundai } from './brands/hyundai.ts'
import { isuzu } from './brands/isuzu.ts'
import { kia } from './brands/kia.ts'
import { mercedesBenz } from './brands/mercedes-benz.ts'
import { mitsubishi } from './brands/mitsubishi.ts'
import { tank } from './brands/tank.ts'
import { volkswagen } from './brands/volkswagen.ts'
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

export type { BrandData, ReleaseBatch, ReleaseRow, Vehicle } from './types.ts'
export { slugify } from './slug.ts'
export { RELEASES } from './releases/index.ts'

/** Last time the hand-edited brand files were reviewed ("YYYY-MM"). */
export const BASE_DATA_UPDATED = '2026-11'

/** Hand-edited brand files, before monthly releases are applied. */
export const BASE_BRANDS: BrandData[] = [
  nissan,
  toyota,
  lexus,
  infiniti,
  jeep,
  ram,
  ford,
  gmc,
  landRover,
  porsche,
  jetour,
  chevrolet,
  cadillac,
  mitsubishi,
  isuzu,
  mercedesBenz,
  bmw,
  volkswagen,
  hyundai,
  kia,
  tank,
  haval,
  changan,
  geely,
]

/** Full catalog = brand files + every release batch. Seeds the DB and the static fallback. */
export const BRANDS: BrandData[] = mergeReleases(BASE_BRANDS, RELEASES)

/** Newest of the brand-file review date and the latest release batch id. */
export const DATA_LAST_UPDATED: string = [BASE_DATA_UPDATED, ...RELEASES.map((r) => r.id.slice(0, 7))].sort().at(-1)!

export const FUELS: readonly string[] = ['petrol', 'diesel', 'hybrid']
export const DRIVETRAINS: readonly string[] = ['4WD', 'AWD', 'RWD', 'FWD']
export const PRICE_BASES: readonly string[] = ['new', 'used']
export const BODY_TYPES: readonly string[] = ['SUV', 'Pickup']

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
          // Runtime checks too: release batches come from CSV/JSON, not the type checker.
          if (!FUELS.includes(v.fuel)) problems.push(`${where} fuel "${v.fuel}" must be one of ${FUELS.join(', ')}`)
          if (!DRIVETRAINS.includes(v.drivetrain)) problems.push(`${where} drivetrain "${v.drivetrain}" must be one of ${DRIVETRAINS.join(', ')}`)
          if (!PRICE_BASES.includes(v.priceBasis)) problems.push(`${where} priceBasis "${v.priceBasis}" must be new or used`)
          if (!BODY_TYPES.includes(f.bodyType)) problems.push(`${where} bodyType "${f.bodyType}" must be SUV or Pickup`)
          if (!v.trim?.trim() || !v.engine?.trim()) problems.push(`${where} trim and engine are required`)
          if (!Number.isInteger(v.year) || v.year < 1950 || v.year > new Date().getFullYear() + 2) problems.push(`${where} year ${v.year} looks wrong`)
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
