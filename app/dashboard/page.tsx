"use client"
import { useEffect, useState } from 'react'
import MapPlaceholder from '../../app/components/MapPlaceholder'
import MapboxMap from '../../app/components/MapboxMap'
import RideCard from '../../app/components/RideCard'
import RiderSimulator from '../../app/components/RiderSimulator'
import { mockRiders } from '../../app/lib/mockRiders'

function toRad(n: number) { return n * Math.PI / 180 }
function haversine(a: [number, number], b: [number, number]) {
  const R = 6371 // km
  const dLat = toRad(b[0] - a[0])
  const dLon = toRad(b[1] - a[1])
  const lat1 = toRad(a[0])
  const lat2 = toRad(b[0])

  const hav = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1-hav))
  return R * c
}

export default function DashboardPage() {
  const [loc, setLoc] = useState<[number,number] | null>(null)
  const [riders, setRiders] = useState<unknown[]>([])

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoc([37.7749, -122.4194])
      return
    }
    navigator.geolocation.getCurrentPosition((p) => {
      setLoc([p.coords.latitude, p.coords.longitude])
    }, () => setLoc([37.7749, -122.4194]))
  }, [])

  useEffect(() => {
    if (!loc) return
    const enriched = mockRiders.map(r => {
      const d = haversine(loc, [r.lat, r.lng])
      const eta = Math.max(2, Math.round(d * 3))
      return { ...r, distanceKm: d, eta }
    }).sort((a,b) => a.distanceKm - b.distanceKm)
    setRiders(enriched)
  }, [loc])

  return (
    <>
      <main className='px-5 mt-25 overflow-hidden'>

        <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
          <input placeholder="Enter lat,lng (e.g. 37.77,-122.41)" onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const v = (e.target as HTMLInputElement).value.trim()
              if (v.includes(',')) {
                const [a, b] = v.split(',').map(s => parseFloat(s))
                if (!Number.isNaN(a) && !Number.isNaN(b)) setLoc([a, b])
              }
            }
          }} style={{ flex: 1, padding: 8 }} />

          <button onClick={() => {
            if (!navigator.geolocation) { alert('Geolocation not available') ; return }
            navigator.geolocation.getCurrentPosition(p => setLoc([p.coords.latitude, p.coords.longitude]), () => alert('Unable to read location'))
          }}>Use my location</button>

          <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input type="checkbox" checked={Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN) && false} readOnly /> Mapbox
          </label>
        </div>

        <div style={{ height: 320, marginBottom: 12 }}>
          {process.env.NEXT_PUBLIC_MAPBOX_TOKEN
            ? <MapboxMap center={loc ? [loc[1], loc[0]] : undefined} />
            : <MapPlaceholder message="Enable NEXT_PUBLIC_MAPBOX_TOKEN to see live map" />}
        </div>

        <section>
          <h2>Closest riders</h2>
          {riders.map(r => (
            <RideCard key={r.id} id={r.id} name={r.name} distanceKm={r.distanceKm} etaMin={r.eta} rating={r.rating} />
          ))}
        </section>

        <section style={{ marginTop: 18 }}>
          <h3>Active requests</h3>
          <ActiveRequests />
        </section>

        <RiderSimulator />
      </main>
    </>
  )
}

function ActiveRequests() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    function refresh() {
      try {
        const raw = localStorage.getItem('mock_rides')
        const arr = raw ? JSON.parse(raw) : []
        setCount(arr.filter((r: any) => r.status !== 'completed' && r.status !== 'cancelled').length)
      } catch {
        setCount(0)
      }
    }
    refresh()
    const onStorage = () => refresh()
    window.addEventListener('storage', onStorage)
    const ch = new BroadcastChannel('ride_channel')
    ch.addEventListener('message', onStorage)
    const timer = setInterval(refresh, 2000)
    return () => { window.removeEventListener('storage', onStorage); ch.close(); clearInterval(timer) }
  }, [])

  return <div>{count} active request(s)</div>
}
