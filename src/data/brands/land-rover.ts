import type { BrandData } from '../types.ts'

// Land Rover — UAE ballpark figures (estimated).
export const landRover: BrandData = {
  brand: 'Land Rover',
  country: 'UK',
  families: [
    {
      name: 'Defender',
      bodyType: 'SUV',
      generations: [
        {
          code: 'L663',
          yearStart: 2020,
          yearEnd: null,
          variants: [
            { year: 2021, trim: '110 P300', engine: '2.0L turbo I4 (Ingenium)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 165000, priceBasis: 'used', horsepower: 300, torqueNm: 400, realWorldKmPerL: 7.5, duneScore: 8.0, maintenanceScore: 5.0, overallScore: 7.3 },
            { year: 2025, trim: '110 P400 X-Dynamic', engine: '3.0L turbo I6 MHEV (Ingenium)', fuel: 'hybrid', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 420000, priceBasis: 'new', horsepower: 400, torqueNm: 550, realWorldKmPerL: 7.8, duneScore: 8.5, maintenanceScore: 5.0, overallScore: 7.9, notes: 'Mild hybrid (48V).' },
            { year: 2024, trim: '130 P400 X-Dynamic HSE', engine: '3.0L turbo I6 MHEV (Ingenium)', fuel: 'hybrid', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 460000, priceBasis: 'new', horsepower: 400, torqueNm: 550, realWorldKmPerL: 7.5, duneScore: 7.5, maintenanceScore: 5.0, overallScore: 7.5, notes: 'Three-row long body; longer rear overhang.' },
            { year: 2025, trim: 'OCTA', engine: '4.4L twin-turbo V8 MHEV', fuel: 'hybrid', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 860000, priceBasis: 'new', horsepower: 626, torqueNm: 750, realWorldKmPerL: 5.5, duneScore: 9.5, maintenanceScore: 4.0, overallScore: 8.0, notes: '6D Dynamics hydraulic suspension.' },
          ],
        },
      ],
    },
    {
      name: 'Range Rover',
      bodyType: 'SUV',
      generations: [
        {
          code: 'L460',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'P400 SE', engine: '3.0L turbo I6 MHEV (Ingenium)', fuel: 'hybrid', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 560000, priceBasis: 'new', horsepower: 395, torqueNm: 550, realWorldKmPerL: 7.5, duneScore: 7.5, maintenanceScore: 4.0, overallScore: 7.2 },
            { year: 2025, trim: 'P530 Autobiography', engine: '4.4L twin-turbo V8', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 740000, priceBasis: 'new', horsepower: 523, torqueNm: 750, realWorldKmPerL: 6.0, duneScore: 7.5, maintenanceScore: 3.5, overallScore: 7.1 },
          ],
        },
      ],
    },
    {
      name: 'Range Rover Sport',
      bodyType: 'SUV',
      generations: [
        {
          code: 'L461',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'P400 Dynamic SE', engine: '3.0L turbo I6 MHEV (Ingenium)', fuel: 'hybrid', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 450000, priceBasis: 'new', horsepower: 395, torqueNm: 550, realWorldKmPerL: 7.8, duneScore: 7.0, maintenanceScore: 4.0, overallScore: 7.0 },
          ],
        },
      ],
    },
  ],
}
