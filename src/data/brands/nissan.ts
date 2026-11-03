import type { BrandData } from '../types.ts'

// Nissan — UAE ballpark figures (estimated). Used prices = typical GCC-spec, average km, 2026 market.
export const nissan: BrandData = {
  brand: 'Nissan',
  country: 'Japan',
  families: [
    {
      name: 'Patrol',
      bodyType: 'SUV',
      generations: [
        {
          code: 'Y61',
          yearStart: 1997,
          yearEnd: 2024,
          variants: [
            { year: 2010, trim: 'Super Safari', engine: '4.8L I6 (TB48DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed manual', priceAed: 75000, priceBasis: 'used', horsepower: 280, torqueNm: 451, realWorldKmPerL: 5.2, duneScore: 9.0, maintenanceScore: 9.0, overallScore: 7.9, notes: 'Pre-facelift interior; check chassis rust and clutch.' },
            { year: 2015, trim: 'Super Safari', engine: '4.8L I6 (TB48DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed manual', priceAed: 115000, priceBasis: 'used', horsepower: 280, torqueNm: 451, realWorldKmPerL: 5.3, duneScore: 9.5, maintenanceScore: 9.5, overallScore: 8.3 },
            { year: 2019, trim: 'Super Safari', engine: '4.8L I6 (TB48DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed manual', priceAed: 165000, priceBasis: 'used', horsepower: 280, torqueNm: 451, realWorldKmPerL: 5.4, duneScore: 9.5, maintenanceScore: 9.5, overallScore: 8.5 },
            { year: 2019, trim: 'Super Safari Auto', engine: '4.8L I6 (TB48DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 170000, priceBasis: 'used', horsepower: 280, torqueNm: 451, realWorldKmPerL: 5.2, duneScore: 9.0, maintenanceScore: 9.0, overallScore: 8.4 },
            { year: 2023, trim: 'Super Safari', engine: '4.8L I6 (TB48DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed manual', priceAed: 235000, priceBasis: 'new', horsepower: 280, torqueNm: 451, realWorldKmPerL: 5.5, duneScore: 9.5, maintenanceScore: 9.5, overallScore: 8.6, notes: 'Final model years; new price, strong resale.' },
          ],
        },
        {
          code: 'Y62',
          yearStart: 2010,
          yearEnd: 2024,
          variants: [
            { year: 2012, trim: 'LE', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 60000, priceBasis: 'used', horsepower: 400, torqueNm: 560, realWorldKmPerL: 5.8, duneScore: 9.0, maintenanceScore: 7.0, overallScore: 7.8, notes: 'Early Y62: check timing chain noise and hydraulic body motion control (HBMC).' },
            { year: 2016, trim: 'SE', engine: '4.0L V6 (VQ40DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 70000, priceBasis: 'used', horsepower: 275, torqueNm: 394, realWorldKmPerL: 6.5, duneScore: 8.0, maintenanceScore: 8.0, overallScore: 7.3 },
            { year: 2017, trim: 'LE Platinum', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 105000, priceBasis: 'used', horsepower: 400, torqueNm: 560, realWorldKmPerL: 6.0, duneScore: 9.0, maintenanceScore: 7.5, overallScore: 8.3 },
            { year: 2020, trim: 'LE Platinum', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 175000, priceBasis: 'used', horsepower: 400, torqueNm: 560, realWorldKmPerL: 6.1, duneScore: 9.5, maintenanceScore: 8.0, overallScore: 8.7, notes: 'First facelift year (new front end, V-motion grille).' },
            { year: 2021, trim: 'NISMO', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 215000, priceBasis: 'used', horsepower: 428, torqueNm: 560, realWorldKmPerL: 5.8, duneScore: 9.5, maintenanceScore: 7.5, overallScore: 8.8 },
            { year: 2023, trim: 'SE', engine: '4.0L V6 (VQ40DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 215000, priceBasis: 'new', horsepower: 275, torqueNm: 394, realWorldKmPerL: 6.8, duneScore: 8.0, maintenanceScore: 8.5, overallScore: 7.8 },
            { year: 2024, trim: 'LE Platinum', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 320000, priceBasis: 'new', horsepower: 400, torqueNm: 560, realWorldKmPerL: 6.3, duneScore: 9.5, maintenanceScore: 8.0, overallScore: 9.0 },
            { year: 2024, trim: 'NISMO', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 375000, priceBasis: 'new', horsepower: 428, torqueNm: 560, realWorldKmPerL: 6.0, duneScore: 9.5, maintenanceScore: 7.5, overallScore: 9.0 },
          ],
        },
        {
          code: 'Y63',
          yearStart: 2025,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'XE', engine: '3.8L V6 (VQ38)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 235000, priceBasis: 'new', horsepower: 316, torqueNm: 386, realWorldKmPerL: 7.0, duneScore: 8.5, maintenanceScore: 8.0, overallScore: 8.3 },
            { year: 2025, trim: 'LE Platinum', engine: '3.5L twin-turbo V6 (VR35DDTT)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 385000, priceBasis: 'new', horsepower: 425, torqueNm: 700, realWorldKmPerL: 7.0, duneScore: 9.5, maintenanceScore: 7.0, overallScore: 9.1, notes: 'New-generation twin-turbo; long-term reliability not yet proven.' },
            { year: 2026, trim: 'NISMO', engine: '3.5L twin-turbo V6 (VR35DDTT)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 440000, priceBasis: 'new', horsepower: 495, torqueNm: 700, realWorldKmPerL: 6.6, duneScore: 9.5, maintenanceScore: 6.5, overallScore: 9.1 },
          ],
        },
      ],
    },
    {
      name: 'X-Terra',
      bodyType: 'SUV',
      generations: [
        {
          code: 'N50',
          yearStart: 2005,
          yearEnd: 2015,
          variants: [
            { year: 2012, trim: 'S 4x4', engine: '4.0L V6 (VQ40DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 28000, priceBasis: 'used', horsepower: 261, torqueNm: 381, realWorldKmPerL: 6.8, duneScore: 7.5, maintenanceScore: 7.5, overallScore: 6.8 },
          ],
        },
        {
          code: 'D23-based',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2021, trim: 'SE 4WD', engine: '2.5L I4 (QR25DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 78000, priceBasis: 'used', horsepower: 166, torqueNm: 241, realWorldKmPerL: 8.8, duneScore: 6.5, maintenanceScore: 8.5, overallScore: 6.9 },
            { year: 2024, trim: 'Titanium 4WD', engine: '2.5L I4 (QR25DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 115000, priceBasis: 'new', horsepower: 166, torqueNm: 241, realWorldKmPerL: 9.0, duneScore: 6.5, maintenanceScore: 8.5, overallScore: 7.0 },
          ],
        },
      ],
    },
    {
      name: 'Pathfinder',
      bodyType: 'SUV',
      generations: [
        {
          code: 'R53',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'SL 4WD', engine: '3.5L V6 (VQ35DD)', fuel: 'petrol', drivetrain: 'AWD', transmission: '9-speed automatic', priceAed: 175000, priceBasis: 'new', horsepower: 284, torqueNm: 351, realWorldKmPerL: 8.5, duneScore: 4.5, maintenanceScore: 7.5, overallScore: 6.2, notes: 'Unibody; Intelligent 4x4 is an on-demand AWD system.' },
          ],
        },
      ],
    },
    {
      name: 'Navara',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'D23',
          yearStart: 2015,
          yearEnd: null,
          variants: [
            { year: 2022, trim: 'PRO-4X 2.5 Diesel', engine: '2.5L turbo-diesel I4 (YD25)', fuel: 'diesel', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 125000, priceBasis: 'new', horsepower: 188, torqueNm: 450, realWorldKmPerL: 10.5, duneScore: 6.5, maintenanceScore: 8.0, overallScore: 6.9 },
          ],
        },
      ],
    },
  ],
}
