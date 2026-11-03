import type { BrandData } from '../types.ts'

// RAM — UAE ballpark figures (estimated).
export const ram: BrandData = {
  brand: 'RAM',
  country: 'USA',
  families: [
    {
      name: '1500',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'DS',
          yearStart: 2009,
          yearEnd: 2018,
          variants: [
            { year: 2017, trim: 'Laramie', engine: '5.7L V8 (HEMI)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 75000, priceBasis: 'used', horsepower: 395, torqueNm: 556, realWorldKmPerL: 5.8, duneScore: 6.5, maintenanceScore: 6.5, overallScore: 6.7 },
          ],
        },
        {
          code: 'DT',
          yearStart: 2019,
          yearEnd: null,
          variants: [
            { year: 2022, trim: 'Rebel', engine: '5.7L V8 (HEMI eTorque)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 155000, priceBasis: 'used', horsepower: 395, torqueNm: 556, realWorldKmPerL: 6.2, duneScore: 7.0, maintenanceScore: 6.5, overallScore: 7.2 },
            { year: 2023, trim: 'TRX', engine: '6.2L supercharged V8 (Hellcat)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 400000, priceBasis: 'used', horsepower: 702, torqueNm: 881, realWorldKmPerL: 4.0, duneScore: 9.0, maintenanceScore: 4.5, overallScore: 7.4, notes: 'Desert-runner suspension; fuel cost is extreme.' },
            { year: 2025, trim: 'Laramie', engine: '3.0L twin-turbo I6 (Hurricane SO)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 230000, priceBasis: 'new', horsepower: 420, torqueNm: 637, realWorldKmPerL: 7.5, duneScore: 6.5, maintenanceScore: 6.5, overallScore: 7.3 },
            { year: 2025, trim: 'RHO', engine: '3.0L twin-turbo I6 (Hurricane HO)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 335000, priceBasis: 'new', horsepower: 540, torqueNm: 705, realWorldKmPerL: 6.3, duneScore: 8.5, maintenanceScore: 6.0, overallScore: 7.8 },
          ],
        },
      ],
    },
  ],
}
