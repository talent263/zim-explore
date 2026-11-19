import type { Destination, DepartureCity } from '../data/destinations'

export interface TripInputs { adults: number; nights: number; fuelEfficiency: number; fuelPrice: number; tollFee: number; resident: boolean }
export const defaultTripInputs: TripInputs = { adults: 2, nights: 1, fuelEfficiency: 12, fuelPrice: 1.58, tollFee: 4, resident: true }

export function calculateTrip(destination: Destination, city: DepartureCity, inputs: TripInputs) {
  const route = destination.distancesFromCities[city]
  const rate = inputs.resident ? destination.pricing.residentUsd : destination.pricing.nonResidentUsd
  const people = Math.max(1, inputs.adults)
  const nights = Math.max(1, inputs.nights)
  const accommodation = destination.pricing.pricingUnit === 'per night' ? rate * nights : rate * people
  const fuel = (route.km * 2 / Math.max(1, inputs.fuelEfficiency)) * inputs.fuelPrice
  const tolls = route.tollgates * 2 * inputs.tollFee
  const total = accommodation + fuel + tolls
  return { route, accommodation, fuel, tolls, total, perPerson: total / people }
}

export function formatDuration(hours: number) {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60 / 5) * 5
  return m >= 60 ? `${h + 1}h` : h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`
}

export function baseTripEstimate(destination: Destination, city: DepartureCity) {
  return calculateTrip(destination, city, defaultTripInputs)
}
