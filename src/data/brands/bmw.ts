import type { BrandData } from '../types.ts'

// BMW — UAE ballpark figures (estimated). Road-biased AWD SUVs.
export const bmw: BrandData = {
  brand: 'BMW',
  country: 'Germany',
  families: [
    {
      name: 'X5',
      bodyType: 'SUV',
      generations: [
        {
          code: 'G05',
          yearStart: 2019,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'xDrive40i', engine: '3.0L turbo I6 MHEV (B58)', fuel: 'hybrid', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 375000, priceBasis: 'new', horsepower: 375, torqueNm: 520, curbWeightKg: 2250, realWorldKmPerL: 8.5, duneScore: 4.5, maintenanceScore: 5.0, overallScore: 6.3 },
          ],
        },
      ],
    },
    {
      name: 'X7',
      bodyType: 'SUV',
      generations: [
        {
          code: 'G07',
          yearStart: 2019,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'xDrive40i', engine: '3.0L turbo I6 MHEV (B58)', fuel: 'hybrid', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 470000, priceBasis: 'new', horsepower: 375, torqueNm: 520, curbWeightKg: 2450, realWorldKmPerL: 8.0, duneScore: 4.5, maintenanceScore: 5.0, overallScore: 6.4 },
            { year: 2024, trim: 'M60i xDrive', engine: '4.4L twin-turbo V8 MHEV (S68)', fuel: 'hybrid', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 590000, priceBasis: 'new', horsepower: 523, torqueNm: 750, curbWeightKg: 2600, realWorldKmPerL: 6.5, duneScore: 4.5, maintenanceScore: 4.5, overallScore: 6.3 },
          ],
        },
      ],
    },
  ],
}
