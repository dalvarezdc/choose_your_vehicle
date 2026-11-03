import type { BrandData } from '../types.ts'

// Tesla — UAE ballpark figures (estimated). Electric: `realWorldKmPerL` is the
// petrol-energy equivalent (8.9 kWh = 1 L petrol, like US "MPGe"), from real-world
// UAE consumption with A/C on. Dune scores are low: no low range, heavy, road tyres.
export const tesla: BrandData = {
  brand: 'Tesla',
  country: 'USA',
  families: [
    {
      name: 'Model Y',
      bodyType: 'SUV',
      generations: [
        {
          code: 'Model Y (1st gen)',
          yearStart: 2020,
          yearEnd: 2024,
          variants: [
            { year: 2022, trim: 'Long Range AWD', engine: 'Dual motor electric (~75 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 115000, priceBasis: 'used', horsepower: 384, torqueNm: 493, realWorldKmPerL: 52, duneScore: 2.0, maintenanceScore: 7.0, overallScore: 5.2, notes: 'km/L = petrol-energy equivalent (~17 kWh/100 km).' },
            { year: 2023, trim: 'Performance', engine: 'Dual motor electric (~75 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 140000, priceBasis: 'used', horsepower: 456, torqueNm: 660, realWorldKmPerL: 47, duneScore: 1.5, maintenanceScore: 6.5, overallScore: 5.0, notes: 'km/L = petrol-energy equivalent. 21-inch wheels, lowered.' },
          ],
        },
        {
          code: 'Model Y (Juniper)',
          yearStart: 2025,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'RWD', engine: 'Single motor electric', fuel: 'electric', drivetrain: 'RWD', transmission: 'Single-speed', priceAed: 180000, priceBasis: 'new', horsepower: 295, torqueNm: 420, realWorldKmPerL: 55, duneScore: 1.0, maintenanceScore: 7.5, overallScore: 5.0, notes: 'km/L = petrol-energy equivalent.' },
            { year: 2025, trim: 'Long Range AWD', engine: 'Dual motor electric (~79 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 200000, priceBasis: 'new', horsepower: 384, torqueNm: 493, realWorldKmPerL: 52, duneScore: 2.0, maintenanceScore: 7.5, overallScore: 5.4, notes: 'km/L = petrol-energy equivalent.' },
            { year: 2026, trim: 'Performance', engine: 'Dual motor electric (~79 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 240000, priceBasis: 'new', horsepower: 460, torqueNm: 660, realWorldKmPerL: 47, duneScore: 1.5, maintenanceScore: 7.0, overallScore: 5.2, notes: 'km/L = petrol-energy equivalent.' },
          ],
        },
      ],
    },
    {
      name: 'Model X',
      bodyType: 'SUV',
      generations: [
        {
          code: 'Model X (1st gen)',
          yearStart: 2016,
          yearEnd: 2020,
          variants: [
            { year: 2018, trim: '100D', engine: 'Dual motor electric (100 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 115000, priceBasis: 'used', horsepower: 417, torqueNm: 660, realWorldKmPerL: 38, duneScore: 2.5, maintenanceScore: 5.0, overallScore: 4.8, notes: 'km/L = petrol-energy equivalent. Falcon doors and older battery are the risk items.' },
          ],
        },
        {
          code: 'Model X (refresh)',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'Long Range AWD', engine: 'Dual motor electric (100 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 330000, priceBasis: 'new', horsepower: 670, torqueNm: 967, realWorldKmPerL: 40, duneScore: 2.5, maintenanceScore: 6.0, overallScore: 5.4, notes: 'km/L = petrol-energy equivalent. Adjustable air suspension.' },
            { year: 2025, trim: 'Plaid', engine: 'Tri motor electric (100 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 450000, priceBasis: 'new', horsepower: 1020, torqueNm: 1420, realWorldKmPerL: 37, duneScore: 2.5, maintenanceScore: 5.5, overallScore: 5.3, notes: 'km/L = petrol-energy equivalent.' },
          ],
        },
      ],
    },
    {
      name: 'Cybertruck',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'Cybertruck',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2026, trim: 'All-Wheel Drive', engine: 'Dual motor electric (~123 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 404990, priceBasis: 'new', horsepower: 600, torqueNm: 1000, realWorldKmPerL: 34, duneScore: 6.0, maintenanceScore: 5.5, overallScore: 6.3, notes: 'UAE orders Sep 2025, deliveries Jan 2026. Air suspension, rear-wheel steer, front/rear lockers. km/L = petrol-energy equivalent. Torque is an estimate (Tesla quotes wheel torque).', source: 'UAE price: Tesla UAE launch (Sep 2025) via zigwheels.ae / electrek.co' },
            { year: 2026, trim: 'Cyberbeast', engine: 'Tri motor electric (~123 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 454990, priceBasis: 'new', horsepower: 845, torqueNm: 1300, realWorldKmPerL: 32, duneScore: 6.5, maintenanceScore: 5.0, overallScore: 6.4, notes: 'km/L = petrol-energy equivalent. Torque is an estimate.', source: 'UAE price: Tesla UAE launch (Sep 2025) via zigwheels.ae / electrek.co' },
          ],
        },
      ],
    },
  ],
}
