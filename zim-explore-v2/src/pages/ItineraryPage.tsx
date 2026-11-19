import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Copy, MapPin, Route, Share2, Trash2 } from 'lucide-react'
import { getDestinationById } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import { baseTripEstimate, formatDuration } from '../lib/calculations'
import { formatMoney } from '../lib/currency'

export function ItineraryPage() {
  const { savedIds, toggleSaved, departureCity, currency, setDrawerOpen } = useTrip()
  const [copied, setCopied] = useState(false)
  const items = savedIds.map(getDestinationById).filter((item): item is NonNullable<typeof item> => Boolean(item))
  const estimates = useMemo(() => items.map((item) => baseTripEstimate(item, departureCity)), [items, departureCity])
  const total = estimates.reduce((sum, estimate) => sum + estimate.total, 0)
  const distance = estimates.reduce((sum, estimate) => sum + estimate.route.km, 0)
  const summary = `🇿🇼 *Our Zimbabwe getaway*\n\n📍 Starting from ${departureCity}\n${items.map((item, index) => `🗺️ ${index + 1}. ${item.name}\n   ${item.distancesFromCities[departureCity].km} km · ~${formatDuration(item.distancesFromCities[departureCity].driveHours)} · ${formatMoney(estimates[index].total, 'USD')} est.`).join('\n')}\n\n🚙 ${distance.toLocaleString()} km of one-way route distances\n💵 Approx. trip total: ${formatMoney(total, 'USD')}\n\nPlanned with ZimExplore`
  const copySummary = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); window.setTimeout(() => setCopied(false), 2500) } catch { setCopied(false) } }

  return <main className="page-wrap itinerary-page"><Link className="back-link" to="/"><ArrowLeft size={16} /> Back to explore</Link><div className="itinerary-header"><div><span className="eyebrow">YOUR PERSONAL ROUTE</span><h1>Good places.<br /><em>Good company.</em></h1><p>A working plan for the places you’ve saved. Add a stop, share it with your crew and get going.</p></div><div className="itinerary-header-mark"><Share2 size={28} /><span>{items.length.toString().padStart(2, '0')} places</span></div></div>
    {items.length === 0 ? <div className="empty-itinerary"><div className="empty-trip-icon"><MapPin size={25} /></div><span className="eyebrow">YOUR MAP IS STILL OPEN</span><h2>Pick a place to get started.</h2><p>Save destinations from the explore page and we’ll shape them into a trip you can share.</p><Link to="/" className="button button-primary">Explore destinations <ArrowRight size={17} /></Link></div> : <>
      <div className="itinerary-stats"><div><span><MapPin size={16} /> Places saved</span><strong>{items.length}</strong></div><div><span><Route size={16} /> Combined one-way distance*</span><strong>{distance.toLocaleString()} <small>km</small></strong></div><div><span><CalendarDays size={16} /> Starting from</span><strong>{departureCity}</strong></div><div className="stat-total"><span>Estimated total</span><strong>{formatMoney(total, currency)}</strong><small>For two adults · one night / visit each</small></div></div>
      <section className="itinerary-stops"><div className="subsection-heading"><div><span className="eyebrow">THE STOPS</span><h2>Your trip, taking shape.</h2></div><button className="text-button" onClick={() => setDrawerOpen(true)}>Open quick view <ArrowRight size={15} /></button></div><div className="itinerary-list">{items.map((item, index) => <article className="itinerary-stop" key={item.id}><div className="stop-number">{String(index + 1).padStart(2, '0')}</div><img src={item.images[0]} alt="" /><div className="stop-main"><span className="stop-category">{item.category} <span>·</span> {item.province}</span><Link to={`/destination/${item.slug}`} className="stop-name">{item.name}</Link><p>{item.tagline}</p><div className="stop-meta"><span><MapPin size={14} /> {item.distancesFromCities[departureCity].km} km from {departureCity}</span><span><Clock3 size={14} /> ~{formatDuration(item.distancesFromCities[departureCity].driveHours)}</span></div></div><div className="stop-cost"><span>Trip estimate</span><strong>{formatMoney(estimates[index].total, currency)}</strong><small>rate + fuel + tolls</small></div><button className="remove-stop" aria-label={`Remove ${item.name}`} onClick={() => toggleSaved(item.id)}><Trash2 size={17} /></button></article>)}</div><p className="itinerary-disclaimer">*Distance adds each destination’s one-way distance from {departureCity}; actual routing between stops may differ. Total estimate assumes two adults and one night or visit per stop.</p></section>
      <div className="share-panel"><div className="share-icon"><Share2 size={21} /></div><div><span className="eyebrow">PASS THE PLAN AROUND</span><h2>Make it a group trip.</h2><p>Copy your itinerary summary with distances and estimated costs to share on WhatsApp.</p></div><button className="button button-primary" onClick={copySummary}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Copied to clipboard' : 'Copy WhatsApp summary'}</button></div>
    </>}
  </main>
}
