'use client'
import { useEffect, useRef } from 'react'
import { mockRiders } from '../lib/mockRiders'

declare const mapboxgl: any

export default function MapboxMap({ center }: { center?: [number, number] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  useEffect(() => {
    if (!token) return
    if (!containerRef.current) return

    function ensureCss() {
      if (document.getElementById('mapbox-css')) return
      const link = document.createElement('link')
      link.id = 'mapbox-css'
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css'
      document.head.appendChild(link)
    }

    function ensureScript(cb: () => void) {
      if ((window as any).mapboxgl) {
        cb()
        return
      }
      if (document.getElementById('mapbox-js')) {
        const check = setInterval(() => {
          if ((window as any).mapboxgl) { clearInterval(check); cb() }
        }, 200)
        return
      }
      const s = document.createElement('script')
      s.id = 'mapbox-js'
      s.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js'
      s.async = true
      s.onload = () => cb()
      document.head.appendChild(s)
    }

    ensureCss()
    ensureScript(() => {
      const mb = (window as any).mapboxgl
      mb.accessToken = token
      const map = new mb.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center || [-122.4194, 37.7749],
        zoom: 13,
      })

      mockRiders.forEach(r => {
        const el = document.createElement('div')
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.background = '#1978c8'
        el.style.borderRadius = '50%'
        new mb.Marker(el)
          .setLngLat([r.lng, r.lat])
          .setPopup(new mb.Popup({ offset: 10 }).setText(`${r.name} — ${r.vehicle} — ★${r.rating}`))
          .addTo(map)
      })

      return () => map.remove()
    })
  }, [token, center])

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return <div style={{ padding: 16, color: '#666' }}>Mapbox token not set. Set NEXT_PUBLIC_MAPBOX_TOKEN to enable map integration.</div>
  }

  return <div ref={containerRef} style={{ width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden' }} />
}
