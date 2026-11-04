import type { BrandData } from '../types.ts'

// Mercedes-Benz — UAE ballpark figures (estimated).
export const mercedesBenz: BrandData = {
  brand: 'Mercedes-Benz',
  country: 'Germany',
  families: [
    {
      name: 'G-Class',
      bodyType: 'SUV',
      generations: [
        {
          code: 'W463A',
          yearStart: 2018,
          yearEnd: null,
          variants: [
            { year: 2021, trim: 'G 500', engine: '4.0L twin-turbo V8 (M176)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 480000, priceBasis: 'used', horsepower: 422, torqueNm: 610, curbWeightKg: 2500, realWorldKmPerL: 5.5, duneScore: 8.0, maintenanceScore: 4.0, overallScore: 7.4 },
            { year: 2025, trim: 'G 500', engine: '3.0L turbo I6 MHEV (M256)', fuel: 'hybrid', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 680000, priceBasis: 'new', horsepower: 449, torqueNm: 560, curbWeightKg: 2550, realWorldKmPerL: 6.2, duneScore: 8.0, maintenanceScore: 4.0, overallScore: 7.5, notes: 'Mild hybrid (48V); three locking diffs.' },
            { year: 2025, trim: 'AMG G 63', engine: '4.0L twin-turbo V8 MHEV (M177)', fuel: 'hybrid', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 900000, priceBasis: 'new', horsepower: 577, torqueNm: 850, curbWeightKg: 2640, realWorldKmPerL: 5.0, duneScore: 8.0, maintenanceScore: 3.5, overallScore: 7.3 },
          ],
        },
      ],
    },
    {
      name: 'GLE',
      bodyType: 'SUV',
      generations: [
        {
          code: 'V167',
          yearStart: 2019,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'GLE 450 4MATIC', engine: '3.0L turbo I6 MHEV (M256)', fuel: 'hybrid', drivetrain: 'AWD', transmission: '9-speed automatic', priceAed: 380000, priceBasis: 'new', horsepower: 375, torqueNm: 500, curbWeightKg: 2250, realWorldKmPerL: 8.0, duneScore: 4.5, maintenanceScore: 5.0, overallScore: 6.3 },
          ],
        },
      ],
    },
  ],
}
