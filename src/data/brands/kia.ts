import type { BrandData } from '../types.ts'

// Kia — UAE ballpark figures (estimated).
export const kia: BrandData = {
  brand: 'Kia',
  country: 'South Korea',
  families: [
    {
      name: 'Mohave',
      bodyType: 'SUV',
      generations: [
        {
          code: 'HM (facelift)',
          yearStart: 2020,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'GT-Line 3.5', engine: '3.5L V6 (Lambda)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 150000, priceBasis: 'new', horsepower: 271, torqueNm: 335, curbWeightKg: 2250, realWorldKmPerL: 7.8, duneScore: 6.0, maintenanceScore: 7.5, overallScore: 6.6, notes: 'Body-on-frame; GCC engine figures to verify.' },
          ],
        },
      ],
    },
    {
      name: 'Telluride',
      bodyType: 'SUV',
      generations: [
        {
          code: 'ON',
          yearStart: 2020,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'SX 3.8 AWD', engine: '3.8L V6 (Lambda II)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 190000, priceBasis: 'new', horsepower: 291, torqueNm: 355, curbWeightKg: 2000, realWorldKmPerL: 8.5, duneScore: 4.5, maintenanceScore: 7.5, overallScore: 6.4 },
          ],
        },
      ],
    },
  ],
}
