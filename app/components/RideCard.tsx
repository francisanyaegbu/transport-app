'use client'
import Link from 'next/link'

export default function RideCard({ id, name, distanceKm, etaMin, rating }: { id: string, name: string, distanceKm?: number, etaMin?: number, rating?: number }) {
  return (
    <article style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, border: '1px solid #eee', borderRadius: 8, marginBottom: 8 }}>
      <div style={{ width: 48, height: 48, borderRadius: 24, background: '#ddd' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ color: '#555', fontSize: 13 }}>{distanceKm ? distanceKm.toFixed(2) + ' km' : ''} {etaMin ? '— ' + etaMin + ' min' : ''} {rating ? '— ★' + rating : ''}</div>
      </div>
      <Link href={`/ride/${id}`}><button>View</button></Link>
    </article>
  )
}
