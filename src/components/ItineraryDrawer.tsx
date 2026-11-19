import { Link } from 'react-router-dom'
import { ArrowRight, Bookmark, Check, MapPin, Trash2, X } from 'lucide-react'
import { destinations, getDestinationById } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import { baseTripEstimate, formatDuration } from '../lib/calculations'
import { formatMoney } from '../lib/currency'

export function ItineraryDrawer() {
  const { drawerOpen, setDrawerOpen, savedIds, toggleSaved, departureCity, currency } = useTrip()
  if (!drawerOpen) return null
  const items = savedIds.map(getDestinationById).filter((item): item is NonNullable<typeof item> => Boolean(item))
  const totalCost = items.reduce((sum, item) => sum + baseTripEstimate(item, departureCity).total, 0)
  const totalKm = items.reduce((sum, item) => sum + item.distancesFromCities[departureCity].km, 0)
  return <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDrawerOpen(false) }}>
    <aside className="itinerary-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div className="drawer-top"><div><span className="eyebrow">YOUR NEXT ADVENTURE</span><h2 id="drawer-title">My trip <span className="count-pill">{items.length}</span></h2></div><button className="icon-button" onClick={() => setDrawerOpen(false)} aria-label="Close itinerary"><X size={21} /></button></div>
      {items.length === 0 ? <div className="empty-trip"><span className="empty-icon"><Bookmark size={24} /></span><h3>Your trip starts here</h3><p>Save a few places and we’ll bring your route, resident rates and estimated road costs together.</p><button className="button button-primary" onClick={() => setDrawerOpen(false)}>Explore destinations <ArrowRight size={16} /></button></div> : <>
        <div className="drawer-scroll">
          <div className="trip-summary-strip"><span><MapPin size={15} /> Starting in {departureCity}</span><span>{totalKm.toLocaleString()} km*</span></div>
          <div className="drawer-items">{items.map((item) => <div className="drawer-item" key={item.id}><img src={item.images[0]} alt="" /><div className="drawer-item-info"><Link to={`/destination/${item.slug}`} onClick={() => setDrawerOpen(false)}>{item.name}</Link><span>{formatMoney(baseTripEstimate(item, departureCity).total, currency)} est. · {formatDuration(item.distancesFromCities[departureCity].driveHours)} drive</span></div><button className="remove-button" aria-label={`Remove ${item.name}`} onClick={() => toggleSaved(item.id)}><Trash2 size={16} /></button></div>)}</div>
          <div className="drawer-totals"><div><span>Estimated trip total</span><strong>{formatMoney(totalCost, currency)}</strong></div><small>Includes sample rates, round-trip fuel and ZINARA toll estimates. *One-way distances added.</small></div>
        </div>
        <div className="drawer-actions"><Link className="button button-primary button-wide" to="/itinerary" onClick={() => setDrawerOpen(false)}>View full itinerary <ArrowRight size={17} /></Link><button className="text-button" onClick={() => setDrawerOpen(false)}><Check size={15} /> Keep exploring</button></div>
      </>}
      {items.length > 0 && items.length < destinations.length && <span className="drawer-footnote">Resident rates are shown in your selected currency.</span>}
    </aside>
  </div>
}
