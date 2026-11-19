import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Compass, MapPin, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, destinations, type Category, type RoadCondition } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import { DestinationCard } from '../components/DestinationCard'

const bundles = [
  { title: 'Nyanga Highlands + Cultural Trail', subtitle: 'Cool mountain air, stone ruins & fireside evenings', ids: ['troutbeck', 'nyanga-heritage-trail'], image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=82', tag: '2 nights · Manicaland' },
  { title: 'Masvingo Heritage Escape', subtitle: 'Ancient city walls and a Shona village welcome', ids: ['great-zimbabwe', 'great-zimbabwe-village'], image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=82', tag: '1–2 days · Masvingo' },
  { title: 'Matobo Hills & Ndebele Stories', subtitle: 'Rock art, granite country and local heritage', ids: ['matobo-hills', 'amagugu'], image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=82', tag: 'Weekend · Matabeleland South' },
]

export function HomePage() {
  const { toggleSaved, isSaved } = useTrip()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [road, setRoad] = useState<RoadCondition | 'Any road'>('Any road')
  const [budget, setBudget] = useState(250)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const visible = useMemo(() => destinations.filter((destination) => {
    const searchable = `${destination.name} ${destination.province} ${destination.category}`.toLowerCase()
    return searchable.includes(query.trim().toLowerCase()) && (category === 'All' || destination.category === category) && (road === 'Any road' || destination.logistics.roadCondition === road) && destination.pricing.residentUsd <= budget
  }), [query, category, road, budget])

  return <main>
    <section className="hero-section">
      <div className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-content page-wrap"><div className="hero-copy"><span className="hero-kicker"><span className="kicker-line" /> MADE FOR THE JOURNEY HOME</span><h1>Zimbabwe, closer<br />than you <em>think.</em></h1><p>Discover Zimbabwe without the guesswork. Clear resident rates, useful road distances and cultural trails worth taking the long way for.</p><div className="hero-actions"><a className="button button-light" href="#discover">Find your getaway <ArrowDown size={17} /></a><span className="hero-trust"><span className="trust-stars">★★★★★</span> Plan with local clarity</span></div></div>
        <div className="hero-caption"><span className="caption-mark" />Eastern Highlands, Manicaland <span>·</span> A road worth taking</div>
      </div>
      <div className="hero-bottom-glow" />
    </section>
    <section className="search-panel-wrap page-wrap" id="discover"><div className="search-panel"><div className="search-topline"><div><span className="eyebrow">START EXPLORING</span><h2>Where will the road take you?</h2></div><span className="local-rate-note"><Check size={15} /> Resident prices, up front</span></div>
      <div className="search-controls"><label className="search-input"><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a place or province" aria-label="Search destinations" />{query && <button aria-label="Clear search" onClick={() => setQuery('')}>×</button>}</label><div className="category-pills"><button className={category === 'All' ? 'filter-pill active' : 'filter-pill'} onClick={() => setCategory('All')}>All places</button>{categories.map((item) => <button className={category === item ? 'filter-pill active' : 'filter-pill'} key={item} onClick={() => setCategory(category === item ? 'All' : item)}>{item === 'Cultural Centre' ? 'Culture' : item}</button>)}</div></div>
      <div className="filter-bottom"><span className="results-count">Showing <strong>{visible.length}</strong> places across Zimbabwe</span><button className="advanced-toggle" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={15} /> More filters <ChevronDown size={14} className={filtersOpen ? 'rotate-chevron' : ''} /></button></div>
      {filtersOpen && <div className="advanced-filters"><label className="field-label">Road access<select value={road} onChange={(event) => setRoad(event.target.value as typeof road)}><option>Any road</option><option>Sedan Friendly</option><option>High Clearance</option><option>4x4 Recommended</option></select></label><label className="budget-filter"><span>Max resident budget <strong>${budget}</strong></span><input type="range" min="5" max="250" step="5" value={budget} onChange={(event) => setBudget(Number(event.target.value))} /></label><button className="clear-filter" onClick={() => { setRoad('Any road'); setBudget(250); setCategory('All'); setQuery('') }}>Clear filters</button></div>}
    </div></section>

    <section className="destinations-section page-wrap"><div className="section-heading"><div><span className="eyebrow">PLACES WITH A STORY</span><h2>Find your kind of <em>away.</em></h2><p>From highland hideaways to the stories written in stone.</p></div><span className="section-side-note"><Compass size={17} /> {visible.length} places to explore</span></div>
      {visible.length > 0 ? <div className="destination-grid">{visible.map((destination) => <DestinationCard key={destination.id} destination={destination} />)}</div> : <div className="no-results"><Search size={27} /><h3>No places found just yet</h3><p>Try another search or loosen your filters to see more of Zimbabwe.</p><button className="button button-primary" onClick={() => { setRoad('Any road'); setBudget(250); setCategory('All'); setQuery('') }}>Reset search</button></div>}
    </section>

    <section className="bundles-section" id="bundles"><div className="page-wrap"><div className="section-heading bundle-heading"><div><span className="eyebrow">A LITTLE HEAD START</span><h2>Weekend getaway <em>bundles.</em></h2><p>Pair a place to stay with a nearby story worth hearing.</p></div><span className="bundle-signature"><Sparkles size={17} /> Curated for local travellers</span></div><div className="bundle-grid">{bundles.map((bundle, index) => <article className="bundle-card" key={bundle.title}><div className="bundle-image" style={{ backgroundImage: `url(${bundle.image})` }}><span className="bundle-index">0{index + 1}</span><span className="bundle-tag">{bundle.tag}</span></div><div className="bundle-info"><h3>{bundle.title}</h3><p>{bundle.subtitle}</p><div className="bundle-actions"><div className="bundle-places">{bundle.ids.length} places <span>·</span> resident rates shown</div><button className="bundle-save" onClick={() => bundle.ids.forEach((id) => { if (!isSaved(id)) toggleSaved(id) })}>{bundle.ids.every(isSaved) ? <><Check size={15} /> Added to trip</> : <>Add bundle <ArrowRight size={15} /></>}</button></div></div></article>)}</div></div></section>
    <section className="local-callout page-wrap"><div className="callout-symbol"><MapPin size={23} /></div><div><span className="eyebrow">BUILT FOR ZIMBABWE</span><h2>The good bits, made easier to find.</h2><p>Road times, resident rates and ZINARA toll estimates in one place — because planning a local trip should feel like part of the adventure.</p></div><Link to="/list-property" className="button button-outline">Own a place? List it <ArrowUpRight size={17} /></Link></section>
  </main>
}
