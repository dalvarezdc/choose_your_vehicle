/**
 * Loads src/data (the source of truth) into the database. Idempotent: wipes the
 * catalog tables and re-inserts everything in one transaction.
 */
import { createHash } from 'node:crypto'
import { BRANDS, DATA_LAST_UPDATED, slugify, vehicles } from '../src/data/index.ts'
import { transaction, type Db } from './db.ts'

/** Hash of the catalog; the server reseeds automatically when it changes. */
export const DATA_HASH = createHash('sha256').update(JSON.stringify({ DATA_LAST_UPDATED, BRANDS })).digest('hex').slice(0, 16)

export function seed(db: Db): { brands: number; families: number; generations: number; variants: number } {
  return transaction(db, () => {
    db.exec('DELETE FROM variants; DELETE FROM generations; DELETE FROM model_families; DELETE FROM brands; DELETE FROM dataset_meta;')
    const insBrand = db.prepare('INSERT INTO brands (slug, name, country) VALUES (?, ?, ?) RETURNING id')
    const insFamily = db.prepare('INSERT INTO model_families (brand_id, slug, name, body_type) VALUES (?, ?, ?, ?) RETURNING id')
    const insGen = db.prepare('INSERT INTO generations (family_id, code, year_start, year_end) VALUES (?, ?, ?, ?) RETURNING id')
    const insVariant = db.prepare(`INSERT INTO variants (
      id, generation_id, model_year, trim, engine, fuel, drivetrain, transmission, price_aed, price_basis,
      horsepower, torque_nm, curb_weight_kg, km_per_l, dune_score, maintenance_score, overall_score, estimated, source, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    const count = { brands: 0, families: 0, generations: 0, variants: 0 }
    // Flattened ids are computed once in src/data so the DB and the static fallback agree.
    const byKey = new Map(vehicles.map((v) => [`${v.familySlug}|${v.generation}|${v.year}|${v.trim}`, v.id]))

    for (const b of BRANDS) {
      const { id: brandId } = insBrand.get(slugify(b.brand), b.brand, b.country) as { id: number }
      count.brands++
      for (const f of b.families) {
        const familySlug = slugify(`${b.brand} ${f.name}`)
        const { id: familyId } = insFamily.get(brandId, familySlug, f.name, f.bodyType) as { id: number }
        count.families++
        for (const g of f.generations) {
          const { id: genId } = insGen.get(familyId, g.code, g.yearStart, g.yearEnd) as { id: number }
          count.generations++
          for (const v of g.variants) {
            insVariant.run(
              byKey.get(`${familySlug}|${g.code}|${v.year}|${v.trim}`)!,
              genId, v.year, v.trim, v.engine, v.fuel, v.drivetrain, v.transmission ?? null, v.priceAed, v.priceBasis,
              v.horsepower, v.torqueNm, v.curbWeightKg, v.realWorldKmPerL, v.duneScore, v.maintenanceScore, v.overallScore,
              v.estimated === false ? 0 : 1, v.source ?? null, v.notes ?? null,
            )
            count.variants++
          }
        }
      }
    }
    const meta = db.prepare('INSERT INTO dataset_meta (key, value) VALUES (?, ?)')
    meta.run('last_updated', DATA_LAST_UPDATED)
    meta.run('data_hash', DATA_HASH)
    meta.run('seeded_at', new Date().toISOString())
    return count
  })
}

/** Seed only when the DB is empty or the source files changed since the last seed. */
export function seedIfStale(db: Db): boolean {
  const row = db.prepare("SELECT value FROM dataset_meta WHERE key = 'data_hash'").get() as { value: string } | undefined
  if (row?.value === DATA_HASH) return false
  seed(db)
  return true
}
