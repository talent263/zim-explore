import { EXCHANGE_RATE } from '../data/destinations'
export function formatMoney(usd: number, currency: 'USD' | 'ZiG') {
  const amount = currency === 'ZiG' ? usd * EXCHANGE_RATE : usd
  return currency === 'USD' ? `$${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : `ZiG ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}
