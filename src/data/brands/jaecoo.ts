import type { BrandData } from '../types.ts'

// Jaecoo (Chery off-road-styled sub-brand) — UAE ballpark figures (estimated).
// AWD crossovers: fine on graded tracks, not serious dune vehicles.
export const jaecoo: BrandData = {
  brand: 'Jaecoo',
  country: 'China',
  families: [
    {
      name: 'J7',
      bodyType: 'SUV',
      generations: [
        {
          code: 'J7',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'Flagship AWD', engine: '1.6L turbo I4', fuel: 'petrol', drivetrain: 'AWD', transmission: '7-speed DCT', priceAed: 102900, priceBasis: 'new', horsepower: 197, torqueNm: 290, curbWeightKg: 1650, realWorldKmPerL: 10.0, duneScore: 3.0, maintenanceScore: 6.0, overallScore: 5.4, notes: 'Sand mode; FWD trims from AED 82,900.', source: 'UAE price: thedubaijournal.net / omodajaecoo-dubai.ae' },
          ],
        },
      ],
    },
    {
      name: 'J8',
      bodyType: 'SUV',
      generations: [
        {
          code: 'J8',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2025, trim: '2.0T AWD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: 'AWD', transmission: '7-speed DCT', priceAed: 125000, priceBasis: 'new', horsepower: 254, torqueNm: 390, curbWeightKg: 1900, realWorldKmPerL: 9.0, duneScore: 3.5, maintenanceScore: 6.0, overallScore: 5.7, notes: '7-seater; UAE from AED 121,900.' },
          ],
        },
      ],
    },
  ],
}
