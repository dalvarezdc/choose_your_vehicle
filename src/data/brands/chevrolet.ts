import type { BrandData } from '../types.ts'

// Chevrolet — UAE ballpark figures (estimated).
export const chevrolet: BrandData = {
  brand: 'Chevrolet',
  country: 'USA',
  families: [
    {
      name: 'Tahoe',
      bodyType: 'SUV',
      generations: [
        {
          code: 'GMTK2UC',
          yearStart: 2015,
          yearEnd: 2020,
          variants: [
            { year: 2019, trim: 'LT', engine: '5.3L V8 (L83)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 95000, priceBasis: 'used', horsepower: 355, torqueNm: 519, curbWeightKg: 2500, realWorldKmPerL: 6.5, duneScore: 6.5, maintenanceScore: 7.5, overallScore: 7.0 },
          ],
        },
        {
          code: 'T1UC',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2022, trim: 'LT', engine: '5.3L V8 (L84)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 165000, priceBasis: 'used', horsepower: 355, torqueNm: 519, curbWeightKg: 2550, realWorldKmPerL: 6.6, duneScore: 6.5, maintenanceScore: 7.5, overallScore: 7.2 },
            { year: 2025, trim: 'Z71', engine: '5.3L V8 (L84)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 310000, priceBasis: 'new', horsepower: 355, torqueNm: 519, curbWeightKg: 2600, realWorldKmPerL: 6.4, duneScore: 7.5, maintenanceScore: 7.5, overallScore: 7.6, notes: 'Off-road package: skid plates, 2-speed transfer case.' },
            { year: 2025, trim: 'High Country', engine: '6.2L V8 (L87)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 365000, priceBasis: 'new', horsepower: 420, torqueNm: 624, curbWeightKg: 2650, realWorldKmPerL: 6.0, duneScore: 7.0, maintenanceScore: 7.0, overallScore: 7.4 },
          ],
        },
      ],
    },
    {
      name: 'Suburban',
      bodyType: 'SUV',
      generations: [
        {
          code: 'T1UC',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'LT', engine: '5.3L V8 (L84)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 300000, priceBasis: 'new', horsepower: 355, torqueNm: 519, curbWeightKg: 2650, realWorldKmPerL: 6.2, duneScore: 5.5, maintenanceScore: 7.5, overallScore: 7.0, notes: 'Long wheelbase: more cargo, worse break-over in dunes.' },
          ],
        },
      ],
    },
    {
      name: 'Silverado 1500',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'T1XX',
          yearStart: 2019,
          yearEnd: null,
          variants: [
            { year: 2020, trim: 'Trail Boss', engine: '5.3L V8 (L84)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 120000, priceBasis: 'used', horsepower: 355, torqueNm: 519, curbWeightKg: 2350, realWorldKmPerL: 6.5, duneScore: 7.5, maintenanceScore: 7.5, overallScore: 7.3 },
            { year: 2024, trim: 'ZR2', engine: '6.2L V8 (L87)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 285000, priceBasis: 'new', horsepower: 420, torqueNm: 624, curbWeightKg: 2600, realWorldKmPerL: 5.8, duneScore: 8.5, maintenanceScore: 7.0, overallScore: 7.8, notes: 'Multimatic DSSV dampers, front + rear lockers.' },
          ],
        },
      ],
    },
  ],
}
