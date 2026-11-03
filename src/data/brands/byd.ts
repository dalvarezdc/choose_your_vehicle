import type { BrandData } from '../types.ts'

// BYD (Al-Futtaim Electric Mobility in the UAE) — ballpark figures (estimated).
// Electric: `realWorldKmPerL` is the petrol-energy equivalent (8.9 kWh = 1 L).
// Plug-in hybrids (`hybrid`): km/L with the battery depleted (charge-sustaining).
export const byd: BrandData = {
  brand: 'BYD',
  country: 'China',
  families: [
    {
      name: 'Tang',
      bodyType: 'SUV',
      generations: [
        {
          code: 'Tang (2nd gen)',
          yearStart: 2018,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'DM-i AWD', engine: '1.5L turbo I4 + dual motor PHEV', fuel: 'hybrid', drivetrain: 'AWD', transmission: 'E-CVT (DHT)', priceAed: 229900, priceBasis: 'new', horsepower: 415, torqueNm: 640, realWorldKmPerL: 13.0, duneScore: 3.5, maintenanceScore: 6.0, overallScore: 5.7, notes: '7-seat crossover; km/L charge-sustaining.' },
            { year: 2025, trim: 'EV AWD', engine: 'Dual motor electric (108.8 kWh Blade)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 238900, priceBasis: 'new', horsepower: 510, torqueNm: 700, realWorldKmPerL: 43, duneScore: 3.0, maintenanceScore: 6.5, overallScore: 5.6, notes: 'km/L = petrol-energy equivalent (~20.5 kWh/100 km).' },
          ],
        },
      ],
    },
    {
      name: 'Sealion 7',
      bodyType: 'SUV',
      generations: [
        {
          code: 'Sealion 7',
          yearStart: 2025,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'Premium RWD', engine: 'Single motor electric (82.5 kWh Blade)', fuel: 'electric', drivetrain: 'RWD', transmission: 'Single-speed', priceAed: 172900, priceBasis: 'new', horsepower: 313, torqueNm: 380, realWorldKmPerL: 49, duneScore: 1.0, maintenanceScore: 6.5, overallScore: 4.8, notes: 'km/L = petrol-energy equivalent.', source: 'UAE price: byduae.ae (2025)' },
            { year: 2025, trim: 'Performance AWD', engine: 'Dual motor electric (82.5 kWh Blade)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 192900, priceBasis: 'new', horsepower: 523, torqueNm: 690, realWorldKmPerL: 44, duneScore: 2.0, maintenanceScore: 6.5, overallScore: 5.1, notes: 'km/L = petrol-energy equivalent.', source: 'UAE price: byduae.ae (2025)' },
          ],
        },
      ],
    },
    {
      name: 'Shark 6',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'Shark 6',
          yearStart: 2025,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'Premium + Off-Road Kit', engine: '1.5L turbo I4 + dual motor PHEV (29.5 kWh)', fuel: 'hybrid', drivetrain: 'AWD', transmission: 'E-CVT (DMO)', priceAed: 178900, priceBasis: 'new', horsepower: 430, torqueNm: 650, realWorldKmPerL: 12.0, duneScore: 5.5, maintenanceScore: 6.0, overallScore: 6.2, notes: 'UAE launch Sep 2025. Ladder-frame-like body, no low range or lockers. km/L charge-sustaining.', source: 'UAE price: dubicars.com launch report (Sep 2025)' },
            { year: 2026, trim: 'Premium', engine: '1.5L turbo I4 + dual motor PHEV (29.5 kWh)', fuel: 'hybrid', drivetrain: 'AWD', transmission: 'E-CVT (DMO)', priceAed: 166900, priceBasis: 'new', horsepower: 430, torqueNm: 650, realWorldKmPerL: 12.0, duneScore: 5.0, maintenanceScore: 6.0, overallScore: 6.1, notes: 'km/L charge-sustaining.' },
          ],
        },
      ],
    },
  ],
}
