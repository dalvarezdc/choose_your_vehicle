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
            { year: 2023, trim: 'Flagship 2.0T AWD', engine: '2.0L turbo I4 (Drive-E)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 85000, priceBasis: 'used', horsepower: 238, torqueNm: 350, curbWeightKg: 1750, realWorldKmPerL: 9.5, duneScore: 3.5, maintenanceScore: 6.0, overallScore: 5.8 },
            { year: 2024, trim: 'Flagship 2.0T AWD', engine: '2.0L turbo I4 (Drive-E)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 125000, priceBasis: 'new', horsepower: 238, torqueNm: 350, curbWeightKg: 1750, realWorldKmPerL: 9.5, duneScore: 3.5, maintenanceScore: 6.5, overallScore: 6.0 },
            { year: 2026, trim: 'Flagship 2.0T AWD', engine: '2.0L turbo I4 (Drive-E)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 129000, priceBasis: 'new', horsepower: 238, torqueNm: 350, curbWeightKg: 1750, realWorldKmPerL: 9.5, duneScore: 3.5, maintenanceScore: 6.5, overallScore: 6.1 },
          ],
        },
      ],
    },
    {
      name: 'Tugella',
      bodyType: 'SUV',
      generations: [
        {
          code: 'FY11',
          yearStart: 2020,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'Flagship 2.0T AWD', engine: '2.0L turbo I4 (Drive-E)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 115000, priceBasis: 'new', horsepower: 238, torqueNm: 350, curbWeightKg: 1700, realWorldKmPerL: 9.3, duneScore: 3.0, maintenanceScore: 6.0, overallScore: 5.6, notes: 'Coupé-SUV.' },
          ],
        },
      ],
    },
  ],
}
