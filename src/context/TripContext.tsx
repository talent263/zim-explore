import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { DepartureCity } from '../data/destinations'

type Currency = 'USD' | 'ZiG'
interface TripContextValue { departureCity: DepartureCity; setDepartureCity: (city: DepartureCity) => void; currency: Currency; toggleCurrency: () => void; savedIds: string[]; toggleSaved: (id: string) => void; isSaved: (id: string) => boolean; drawerOpen: boolean; setDrawerOpen: (open: boolean) => void }
const TripContext = createContext<TripContextValue | null>(null)
function readStored<T>(key: string, fallback: T): T { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback } }

export function TripProvider({ children }: { children: ReactNode }) {
  const [departureCity, setDepartureCity] = useState<DepartureCity>(() => readStored('zim-city', 'Harare'))
  const [currency, setCurrency] = useState<Currency>(() => readStored('zim-currency', 'USD'))
  const [savedIds, setSavedIds] = useState<string[]>(() => readStored('zim-trip', []))
  const [drawerOpen, setDrawerOpen] = useState(false)
  useEffect(() => localStorage.setItem('zim-city', JSON.stringify(departureCity)), [departureCity])
  useEffect(() => localStorage.setItem('zim-currency', JSON.stringify(currency)), [currency])
  useEffect(() => localStorage.setItem('zim-trip', JSON.stringify(savedIds)), [savedIds])
  const value = useMemo(() => ({ departureCity, setDepartureCity, currency, toggleCurrency: () => setCurrency((current) => current === 'USD' ? 'ZiG' : 'USD'), savedIds, toggleSaved: (id: string) => setSavedIds((current) => current.includes(id) ? current.filter((saved) => saved !== id) : [...current, id]), isSaved: (id: string) => savedIds.includes(id), drawerOpen, setDrawerOpen }), [departureCity, currency, savedIds, drawerOpen])
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}
export function useTrip() { const context = useContext(TripContext); if (!context) throw new Error('useTrip must be used within TripProvider'); return context }
