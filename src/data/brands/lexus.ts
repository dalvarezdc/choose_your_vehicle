import type { BrandData } from '../types.ts'

// Lexus — UAE ballpark figures (estimated).
export const lexus: BrandData = {
  brand: 'Lexus',
  country: 'Japan',
  families: [
    {
      name: 'LX',
      bodyType: 'SUV',
      generations: [
        {
          code: 'J200 (LX570)',
          yearStart: 2008,
          yearEnd: 2021,
          variants: [
            { year: 2019, trim: 'LX570 Platinum', engine: '5.7L V8 (3UR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 215000, priceBasis: 'used', horsepower: 362, torqueNm: 530, curbWeightKg: 2720, realWorldKmPerL: 5.6, duneScore: 8.5, maintenanceScore: 8.5, overallScore: 8.6 },
          ],
        },
        {
          code: 'J310 (LX600)',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'LX600 Prestige', engine: '3.5L twin-turbo V6 (V35A-FTS)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 480000, priceBasis: 'new', horsepower: 409, torqueNm: 650, curbWeightKg: 2600, realWorldKmPerL: 6.8, duneScore: 8.5, maintenanceScore: 8.0, overallScore: 8.9 },
          ],
        },
      ],
    },
    {
      name: 'GX',
      bodyType: 'SUV',
      generations: [
        {
          code: 'J250 (GX550)',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'GX550 Overtrail', engine: '3.5L twin-turbo V6 (V35A-FTS)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 330000, priceBasis: 'new', horsepower: 349, torqueNm: 549, curbWeightKg: 2550, realWorldKmPerL: 7.0, duneScore: 8.5, maintenanceScore: 8.5, overallScore: 8.6 },
          ],
        },
      ],
    },
  ],
}
