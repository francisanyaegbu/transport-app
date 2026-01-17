'use client'
export default function MapPlaceholder({ message }: { message?: string }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f6f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
      <span style={{ color: '#888' }}>{message || 'Map placeholder (swap with Mapbox/Google Maps)'}</span>
    </div>
  )
}
