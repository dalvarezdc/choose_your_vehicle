/**
 * Shapes for the vehicle catalog.
 *
 * Authoring shape (what you edit in src/data/brands/*.ts):
 *   Brand -> model family -> generation -> one record per model year + trim.
 *
 * Flat shape (`Vehicle`): what the database, the API and the UI use. One row per
 * year/trim variant, with brand/family/generation denormalised onto it.
 */

export type Fuel = 'petrol' | 'diesel' | 'hybrid'
export type Drivetrain = '4WD' | 'AWD' | 'RWD' | 'FWD'
export type BodyType = 'SUV' | 'Pickup'
/** `new` = dealer price when that model year was on sale new; `used` = today's UAE used-market ballpark. */
export type PriceBasis = 'new' | 'used'

export interface VariantInput {
  /** Model year the figures refer to. */
  year: number
  trim: string
  /** e.g. "5.6L V8 (VK56VD)" */
  engine: string
  fuel: Fuel
  drivetrain: Drivetrain
  transmission?: string
  priceAed: number
  priceBasis: PriceBasis
  horsepower: number
  torqueNm: number
  /** Mixed UAE driving, A/C on. */
  realWorldKmPerL: number
  /** 0–10, higher is better. */
  duneScore: number
  /** 0–10, higher = cheaper, simpler, more reliable to keep running. */
  maintenanceScore: number
  /** 0–10, overall suitability for UAE 4x4 use. */
  overallScore: number
  /**
   * Defaults to `true`. Set to `false` only once every number in the record has been
   * checked against a dealer price list / spec sheet, and fill in `source`.
   */
  estimated?: boolean
  source?: string
  notes?: string
}

export interface GenerationInput {
  /** Generation / chassis code, e.g. "Y61", "J300", "9YA". */
  code: string
  yearStart: number
  /** `null` = still on sale. */
  yearEnd: number | null
  variants: VariantInput[]
}

export interface FamilyInput {
  name: string
  bodyType: BodyType
  generations: GenerationInput[]
}

export interface BrandData {
  brand: string
  country: string
  families: FamilyInput[]
}

/** One year/trim variant, flattened. */
export interface Vehicle {
  id: string
  brand: string
  brandSlug: string
  family: string
  familySlug: string
  bodyType: BodyType
  generation: string
  generationStart: number
  generationEnd: number | null
  year: number
  trim: string
  engine: string
  fuel: Fuel
  drivetrain: Drivetrain
  transmission: string | null
  priceAed: number
  priceBasis: PriceBasis
  horsepower: number
  torqueNm: number
  realWorldKmPerL: number
  duneScore: number
  maintenanceScore: number
  overallScore: number
  estimated: boolean
  source: string | null
  notes: string | null
}
