import type { BrandData } from '../types.ts'

// Infiniti — UAE ballpark figures (estimated).
export const infiniti: BrandData = {
  brand: 'Infiniti',
  country: 'Japan',
  families: [
    {
      name: 'QX80',
      bodyType: 'SUV',
      generations: [
        {
          code: 'Z62',
          yearStart: 2013,
          yearEnd: 2024,
          variants: [
            { year: 2018, trim: 'Luxe', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 105000, priceBasis: 'used', horsepower: 400, torqueNm: 560, realWorldKmPerL: 5.8, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.6 },
            { year: 2023, trim: 'Sensory', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 255000, priceBasis: 'used', horsepower: 400, torqueNm: 560, realWorldKmPerL: 6.0, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.9 },
          ],
        },
        {
          code: 'Z63',
          yearStart: 2025,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'Sensory', engine: '3.5L twin-turbo V6 (VR35DDTT)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 400000, priceBasis: 'new', horsepower: 450, torqueNm: 700, realWorldKmPerL: 7.5, duneScore: 7.5, maintenanceScore: 6.5, overallScore: 8.1 },
          ],
        },
      ],
    },
  ],
}
