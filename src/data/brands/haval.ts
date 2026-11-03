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
          code: 'H9 (1st gen)',
          yearStart: 2015,
          yearEnd: 2023,
          variants: [
            { year: 2018, trim: '2.0T Elite 4WD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 35000, priceBasis: 'used', horsepower: 218, torqueNm: 324, realWorldKmPerL: 8.0, duneScore: 6.0, maintenanceScore: 5.0, overallScore: 5.6 },
            { year: 2021, trim: '2.0T Supreme 4WD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 55000, priceBasis: 'used', horsepower: 218, torqueNm: 324, realWorldKmPerL: 8.2, duneScore: 6.5, maintenanceScore: 5.5, overallScore: 6.0 },
          ],
        },
        {
          code: 'H9 (2nd gen)',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2025, trim: '2.0T Supreme', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 115000, priceBasis: 'new', horsepower: 218, torqueNm: 380, realWorldKmPerL: 8.8, duneScore: 7.0, maintenanceScore: 6.5, overallScore: 6.8, notes: 'Body-on-frame with locking rear diff.' },
            { year: 2026, trim: '2.0T Premium', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 105000, priceBasis: 'new', horsepower: 218, torqueNm: 380, realWorldKmPerL: 8.8, duneScore: 7.0, maintenanceScore: 6.5, overallScore: 6.8 },
          ],
        },
      ],
    },
  ],
}
