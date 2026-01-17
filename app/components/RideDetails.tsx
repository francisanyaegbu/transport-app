'use client'
import { useEffect, useState } from 'react'
import { mockRiders } from '../lib/mockRiders'

function genId(prefix = 'ride') { return prefix + '_' + Date.now() }

export default function RideDetails({ riderId }: { riderId: string }) {
  const rider = mockRiders.find(r => r.id === riderId)
  const [status, setStatus] = useState<string | null>(null)
  const [rideId, setRideId] = useState<string | null>(null)

  useEffect(() => {
    const ch = new BroadcastChannel('ride_channel')
    function onmsg(ev: MessageEvent) {
      const m = ev.data
      if (!m) return
      if (m.type === 'ride_update' && m.rideId === rideId) {
        setStatus(m.status)
        // update local storage copy
        const raw = localStorage.getItem('mock_rides')
        const arr = raw ? JSON.parse(raw) : []
        const idx = arr.findIndex((r: any) => r.id === m.rideId)
        if (idx !== -1) {
          arr[idx].status = m.status
          if (m.status === 'accepted') arr[idx].startedAt = Date.now()
          if (m.status === 'completed') arr[idx].completedAt = Date.now()
          localStorage.setItem('mock_rides', JSON.stringify(arr))
        }
      }
    }
    ch.addEventListener('message', onmsg)
    return () => ch.close()
  }, [rideId])

  function handleRequest() {
    const session = localStorage.getItem('mock_session') || 'anon'
    const newRide = {
      id: genId(),
      riderId,
      studentId: session,
      origin: 'Current location',
      destination: 'Selected destination',
      status: 'requested',
      requestedAt: Date.now()
    }
    const raw = localStorage.getItem('mock_rides')
    const arr = raw ? JSON.parse(raw) : []
    arr.push(newRide)
    localStorage.setItem('mock_rides', JSON.stringify(arr))
    setRideId(newRide.id)
    setStatus('requested')

    // publish request on channel for simulators/riders
    const ch = new BroadcastChannel('ride_channel')
    ch.postMessage({ type: 'ride_requested', ride: newRide })
    ch.close()
  }

  if (!rider) return <div>Rider not found</div>

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: '#ddd' }} />
        <div>
          <div style={{ fontWeight: 700 }}>{rider.name}</div>
          <div style={{ color: '#666' }}>{rider.vehicle} — ★{rider.rating}</div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Route</h3>
        <p>From: Current location</p>
        <p>To: Destination (select on map)</p>
      </div>

      <div style={{ marginTop: 12 }}>
        {!rideId && <button onClick={handleRequest}>Request ride</button>}
        {rideId && <div>Request ID: {rideId} — Status: {status}</div>}
      </div>
    </div>
  )
}
