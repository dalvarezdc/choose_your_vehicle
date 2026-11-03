import type { BrandData } from '../types.ts'

// Geely — UAE ballpark figures (estimated). AWD crossover, included for price comparison.
export const geely: BrandData = {
  brand: 'Geely',
  country: 'China',
  families: [
    {
      name: 'Monjaro',
      bodyType: 'SUV',
      generations: [
        {
          code: 'KX11',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'Flagship 2.0T AWD', engine: '2.0L turbo I4 (Drive-E)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 125000, priceBasis: 'new', horsepower: 238, torqueNm: 350, realWorldKmPerL: 9.5, duneScore: 3.5, maintenanceScore: 6.5, overallScore: 6.0 },
          ],
        },
      ],
    },
  ],
}
