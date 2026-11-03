import type { BrandData } from '../types.ts'

// Volkswagen — UAE ballpark figures (estimated).
export const volkswagen: BrandData = {
  brand: 'Volkswagen',
  country: 'Germany',
  families: [
    {
      name: 'Touareg',
      bodyType: 'SUV',
      generations: [
        {
          code: 'CR',
          yearStart: 2018,
          yearEnd: null,
          variants: [
            { year: 2021, trim: '2.0 TSI', engine: '2.0L turbo I4 (EA888)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 110000, priceBasis: 'used', horsepower: 252, torqueNm: 370, realWorldKmPerL: 9.0, duneScore: 5.0, maintenanceScore: 5.5, overallScore: 6.2 },
            { year: 2024, trim: 'R-Line 3.0 V6', engine: '3.0L turbo V6 (EA839)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 300000, priceBasis: 'new', horsepower: 340, torqueNm: 450, realWorldKmPerL: 8.0, duneScore: 5.5, maintenanceScore: 5.5, overallScore: 6.5 },
          ],
        },
      ],
    },
  ],
}
