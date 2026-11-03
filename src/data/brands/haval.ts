import type { BrandData } from '../types.ts'

// Haval (Great Wall Motor) — UAE ballpark figures (estimated).
export const haval: BrandData = {
  brand: 'Haval',
  country: 'China',
  families: [
    {
      name: 'H9',
      bodyType: 'SUV',
      generations: [
        {
          code: 'H9 (2nd gen)',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2025, trim: '2.0T Supreme', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 115000, priceBasis: 'new', horsepower: 218, torqueNm: 380, realWorldKmPerL: 8.8, duneScore: 7.0, maintenanceScore: 6.5, overallScore: 6.8, notes: 'Body-on-frame with locking rear diff.' },
          ],
        },
      ],
    },
  ],
}
