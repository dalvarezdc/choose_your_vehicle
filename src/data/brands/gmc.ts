import type { BrandData } from '../types.ts'

// GMC — UAE ballpark figures (estimated).
export const gmc: BrandData = {
  brand: 'GMC',
  country: 'USA',
  families: [
    {
      name: 'Yukon',
      bodyType: 'SUV',
      generations: [
        {
          code: 'GMTK2YG',
          yearStart: 2015,
          yearEnd: 2020,
          variants: [
            { year: 2019, trim: 'Denali', engine: '6.2L V8 (L86)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 120000, priceBasis: 'used', horsepower: 420, torqueNm: 624, realWorldKmPerL: 5.8, duneScore: 7.0, maintenanceScore: 7.0, overallScore: 7.5 },
          ],
        },
        {
          code: 'T1YG',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'SLE', engine: '5.3L V8 (L84)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 250000, priceBasis: 'new', horsepower: 355, torqueNm: 519, realWorldKmPerL: 6.3, duneScore: 7.0, maintenanceScore: 7.5, overallScore: 7.6 },
            { year: 2025, trim: 'AT4', engine: '6.2L V8 (L87)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 340000, priceBasis: 'new', horsepower: 420, torqueNm: 624, realWorldKmPerL: 5.9, duneScore: 8.0, maintenanceScore: 7.0, overallScore: 8.0 },
            { year: 2025, trim: 'Denali Ultimate', engine: '6.2L V8 (L87)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 420000, priceBasis: 'new', horsepower: 420, torqueNm: 624, realWorldKmPerL: 5.9, duneScore: 7.0, maintenanceScore: 6.5, overallScore: 7.9 },
          ],
        },
      ],
    },
    {
      name: 'Sierra 1500',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'T1XX',
          yearStart: 2019,
          yearEnd: null,
          variants: [
            { year: 2021, trim: 'AT4', engine: '6.2L V8 (L87)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 150000, priceBasis: 'used', horsepower: 420, torqueNm: 624, realWorldKmPerL: 5.9, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.5 },
            { year: 2024, trim: 'Elevation', engine: '5.3L V8 (L84)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 200000, priceBasis: 'new', horsepower: 355, torqueNm: 519, realWorldKmPerL: 6.3, duneScore: 7.0, maintenanceScore: 7.5, overallScore: 7.4 },
            { year: 2025, trim: 'AT4X', engine: '6.2L V8 (L87)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 330000, priceBasis: 'new', horsepower: 420, torqueNm: 624, realWorldKmPerL: 5.8, duneScore: 8.5, maintenanceScore: 6.5, overallScore: 7.9, notes: 'Multimatic DSSV dampers, front and rear e-lockers.' },
          ],
        },
      ],
    },
    {
      name: 'Canyon',
      bodyType: 'Pickup',
      generations: [
        {
          code: '31XX-2',
          yearStart: 2023,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'AT4X', engine: '2.7L turbo I4 (L3B)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 210000, priceBasis: 'new', horsepower: 310, torqueNm: 583, realWorldKmPerL: 7.8, duneScore: 8.5, maintenanceScore: 7.0, overallScore: 7.9 },
          ],
        },
      ],
    },
    {
      name: 'Terrain',
      bodyType: 'SUV',
      generations: [
        {
          code: 'D2XX',
          yearStart: 2018,
          yearEnd: 2024,
          variants: [
            { year: 2024, trim: 'AT4 AWD', engine: '1.5L turbo I4', fuel: 'petrol', drivetrain: 'AWD', transmission: '9-speed automatic', priceAed: 115000, priceBasis: 'new', horsepower: 170, torqueNm: 275, realWorldKmPerL: 10.0, duneScore: 4.0, maintenanceScore: 7.5, overallScore: 6.2, notes: 'Soft-roader: gravel and graded tracks, not dunes.' },
          ],
        },
      ],
    },
  ],
}
