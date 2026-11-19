import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { TripProvider } from './context/TripContext'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { DestinationPage } from './pages/DestinationPage'
import { ItineraryPage } from './pages/ItineraryPage'
import { ListPropertyPage } from './pages/ListPropertyPage'
import { ArrowUp, Compass } from 'lucide-react'

function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0) }, [pathname]); return null }
function Footer() { return <footer className="site-footer"><div className="page-wrap footer-inner"><div className="footer-brand"><span className="brand-mark"><Compass size={18} /></span><span>Zim<span>Explore</span></span><p>Zimbabwe, closer than you think.</p></div><div className="footer-note"><span>Made for the journey home.</span><span>Rates shown in USD · ZiG conversion is configurable planning guidance.</span></div><a href="#top" className="back-top" aria-label="Back to top"><ArrowUp size={16} /></a></div><div className="page-wrap footer-bottom"><span>© 2026 ZimExplore</span><span>Plan local. Discover more.</span></div></footer> }
function AppLayout() { return <><ScrollToTop /><Navbar /><Routes><Route path="/" element={<HomePage />} /><Route path="/destination/:slug" element={<DestinationPage />} /><Route path="/itinerary" element={<ItineraryPage />} /><Route path="/list-property" element={<ListPropertyPage />} /></Routes><Footer /></> }
export default function App() { return <BrowserRouter><TripProvider><AppLayout /></TripProvider></BrowserRouter> }
