import type { BrandData } from '../types.ts'

// Mitsubishi — UAE ballpark figures (estimated).
export const mitsubishi: BrandData = {
  brand: 'Mitsubishi',
  country: 'Japan',
  families: [
    {
      name: 'Pajero',
      bodyType: 'SUV',
      generations: [
        {
          code: 'V90 (4th gen)',
          yearStart: 2007,
          yearEnd: 2021,
          variants: [
            { year: 2015, trim: 'GLS 3.8', engine: '3.8L V6 (6G75 MIVEC)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 40000, priceBasis: 'used', horsepower: 250, torqueNm: 329, realWorldKmPerL: 6.8, duneScore: 6.5, maintenanceScore: 8.0, overallScore: 6.7 },
            { year: 2020, trim: 'GLS 3.8 Signature', engine: '3.8L V6 (6G75 MIVEC)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 75000, priceBasis: 'used', horsepower: 250, torqueNm: 329, realWorldKmPerL: 7.0, duneScore: 6.5, maintenanceScore: 8.0, overallScore: 6.9, notes: 'Final GCC model years; Super Select 4WD-II.' },
          ],
        },
      ],
    },
    {
      name: 'Montero Sport',
      bodyType: 'SUV',
      generations: [
        {
          code: 'QE/QF',
          yearStart: 2016,
          yearEnd: null,
          variants: [
            { year: 2021, trim: 'GLS 3.0', engine: '3.0L V6 (6B31 MIVEC)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 80000, priceBasis: 'used', horsepower: 220, torqueNm: 285, realWorldKmPerL: 8.0, duneScore: 6.5, maintenanceScore: 8.0, overallScore: 6.8 },
            { year: 2025, trim: 'Signature Edition 3.0', engine: '3.0L V6 (6B31 MIVEC)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 140000, priceBasis: 'new', horsepower: 220, torqueNm: 285, realWorldKmPerL: 8.0, duneScore: 6.5, maintenanceScore: 8.0, overallScore: 6.9 },
          ],
        },
      ],
    },
  ],
}
