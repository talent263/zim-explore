import { useEffect, useMemo, useState } from 'react'
import { Fuel, Gauge, Info, Users, WalletCards } from 'lucide-react'
import type { Destination } from '../data/destinations'
import { departureCities } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import { calculateTrip, defaultTripInputs, type TripInputs } from '../lib/calculations'
import { formatMoney } from '../lib/currency'

export function TripCostCalculator({ destination, onEstimateChange }: { destination: Destination; onEstimateChange?: (estimate: ReturnType<typeof calculateTrip>, inputs: TripInputs) => void }) {
  const { departureCity, setDepartureCity, currency } = useTrip()
  const [inputs, setInputs] = useState<TripInputs>(defaultTripInputs)
  const estimate = useMemo(() => calculateTrip(destination, departureCity, inputs), [destination, departureCity, inputs])
  useEffect(() => onEstimateChange?.(estimate, inputs), [estimate, inputs, onEstimateChange])
  const update = (key: keyof TripInputs, value: number | boolean) => setInputs((current) => ({ ...current, [key]: value }))
  return <section className="calculator-card">
    <div className="calculator-heading"><div><span className="eyebrow">PLAN THE DRIVE</span><h2>Road-trip cost estimate</h2></div><span className="estimate-icon"><Fuel size={20} /></span></div>
    <p className="calculator-intro">See your main trip costs before you set off. Estimates use round-trip distance from your selected city.</p>
    <div className="calculator-fields">
      <label className="field-label">Departing from<select value={departureCity} onChange={(event) => setDepartureCity(event.target.value as typeof departureCity)}>{departureCities.map((city) => <option key={city}>{city}</option>)}</select></label>
      <label className="field-label">Adults<div className="input-icon"><Users size={16} /><input type="number" min="1" max="20" value={inputs.adults} onChange={(event) => update('adults', Math.max(1, Number(event.target.value)))} /></div></label>
      <label className="field-label">Nights / days<div className="input-icon"><input type="number" min="1" max="30" value={inputs.nights} onChange={(event) => update('nights', Math.max(1, Number(event.target.value)))} /><span>{destination.pricing.pricingUnit === 'per night' ? 'nights' : 'days'}</span></div></label>
      <label className="field-label">Fuel efficiency<div className="input-icon"><Gauge size={16} /><input type="number" min="1" step="0.5" value={inputs.fuelEfficiency} onChange={(event) => update('fuelEfficiency', Math.max(1, Number(event.target.value)))} /><span>km/L</span></div></label>
      <label className="field-label">Fuel price<div className="input-icon"><span className="input-prefix">$</span><input type="number" min="0" step="0.01" value={inputs.fuelPrice} onChange={(event) => update('fuelPrice', Math.max(0, Number(event.target.value)))} /><span>/ L</span></div></label>
    </div>
    <div className="resident-switch-row"><div><strong>Resident rates</strong><span>Use Zimbabwe resident pricing</span></div><button role="switch" aria-checked={inputs.resident} className={`switch ${inputs.resident ? 'switch-on' : ''}`} onClick={() => update('resident', !inputs.resident)}><span /></button></div>
    <div className="toll-options"><span>ZINARA toll estimate</span><label><input type="radio" checked={inputs.tollFee === 4} onChange={() => update('tollFee', 4)} /> Standard $4 / gate</label><label><input type="radio" checked={inputs.tollFee === 10} onChange={() => update('tollFee', 10)} /> Premium $10 / gate</label></div>
    <div className="cost-breakdown"><div><span><WalletCards size={15} />{destination.pricing.pricingUnit === 'per night' ? `Stay · ${inputs.nights} night${inputs.nights > 1 ? 's' : ''}` : `Entry · ${inputs.adults} adult${inputs.adults > 1 ? 's' : ''}`}</span><strong>{formatMoney(estimate.accommodation, currency)}</strong></div><div><span><Fuel size={15} />Round-trip fuel</span><strong>{formatMoney(estimate.fuel, currency)}</strong></div><div><span><MapPinIcon />Round-trip tollgates · {estimate.route.tollgates * 2}</span><strong>{formatMoney(estimate.tolls, currency)}</strong></div></div>
    <div className="total-estimate"><div><span>Total estimated trip cost</span><small>For {inputs.adults} adult{inputs.adults > 1 ? 's' : ''} · {estimate.route.km * 2} km round trip</small></div><strong>{formatMoney(estimate.total, currency)}</strong><div className="per-person">{formatMoney(estimate.perPerson, currency)} <span>per person</span></div></div>
    <p className="estimate-note"><Info size={14} />Planning estimate only. Confirm current rates, fuel prices and toll charges before travel.</p>
  </section>
}
function MapPinIcon() { return <span className="toll-icon">T</span> }
