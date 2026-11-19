import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Compass, Menu, X, MapPin, ChevronDown, Bookmark } from 'lucide-react'
import { departureCities } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import { ItineraryDrawer } from './ItineraryDrawer'

export function Navbar() {
  const { departureCity, setDepartureCity, currency, toggleCurrency, savedIds, setDrawerOpen } = useTrip()
  const [menuOpen, setMenuOpen] = useState(false)
  return <>
    <header className="site-header" id="top">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="ZimExplore home"><span className="brand-mark"><Compass size={20} strokeWidth={2.2} /></span><span>Zim<span>Explore</span></span></Link>
        <nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Explore</NavLink>
          <a href="/#bundles" onClick={() => setMenuOpen(false)}>Weekend bundles</a>
          <NavLink to="/list-property" onClick={() => setMenuOpen(false)}>List your property</NavLink>
        </nav>
        <div className="nav-controls">
          <label className="city-control"><MapPin size={15} /><span className="sr-only">Departure city</span><select aria-label="Departure city" value={departureCity} onChange={(event) => setDepartureCity(event.target.value as typeof departureCity)}>{departureCities.map((city) => <option key={city}>{city}</option>)}</select><ChevronDown size={13} className="select-chevron" /></label>
          <button className="currency-toggle" onClick={toggleCurrency} aria-label={`Switch currency, current ${currency}`}>{currency === 'USD' ? '$ USD' : 'ZiG'}<span className="toggle-dot" /></button>
          <button className="trip-nav-button" onClick={() => setDrawerOpen(true)} aria-label={`Open itinerary, ${savedIds.length} saved destinations`}><Bookmark size={17} /><span>My trip</span><b>{savedIds.length}</b></button>
        </div>
        <button className="mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </header>
    <ItineraryDrawer />
  </>
}
