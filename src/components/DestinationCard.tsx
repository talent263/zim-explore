import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock3, Heart, MapPin, Plus, Route, Check } from 'lucide-react'
import type { Destination } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import { formatDuration } from '../lib/calculations'
import { formatMoney } from '../lib/currency'

export function DestinationCard({ destination }: { destination: Destination }) {
  const { departureCity, currency, isSaved, toggleSaved } = useTrip()
  const route = destination.distancesFromCities[departureCity]
  const saved = isSaved(destination.id)
  return <article className="destination-card">
    <div className="card-image-wrap"><Link to={`/destination/${destination.slug}`} aria-label={`View ${destination.name}`}><img className="card-image" src={destination.images[0]} alt={destination.name} loading="lazy" /></Link><span className="category-badge">{destination.category}</span><button className={`save-heart ${saved ? 'is-saved' : ''}`} aria-label={saved ? `Remove ${destination.name} from trip` : `Save ${destination.name} to trip`} onClick={() => toggleSaved(destination.id)}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button><span className={`road-badge road-${destination.logistics.roadCondition.toLowerCase().replace(/ /g, '-')}`}>{destination.logistics.roadCondition}</span></div>
    <div className="card-body"><div className="card-location"><MapPin size={13} />{destination.province} Province <span>·</span> {destination.category}</div><Link to={`/destination/${destination.slug}`} className="card-title">{destination.name}<ArrowUpRight size={16} /></Link><p className="card-tagline">{destination.tagline}</p>
      <div className="card-route"><Route size={15} /><span><strong>{route.km} km</strong> from {departureCity}</span><span className="route-dot">·</span><Clock3 size={14} /><span>~{formatDuration(route.driveHours)}</span></div>
      <div className="card-footer"><div className="card-price"><span>Resident rate <span className="resident-check">✓</span></span><strong>{formatMoney(destination.pricing.residentUsd, currency)}<small> / {destination.pricing.pricingUnit.replace('per ', '')}</small></strong></div><button className={`add-trip-button ${saved ? 'added' : ''}`} onClick={() => toggleSaved(destination.id)}>{saved ? <Check size={16} /> : <Plus size={16} />}{saved ? 'Added' : 'Add to trip'}</button></div>
    </div>
  </article>
}
