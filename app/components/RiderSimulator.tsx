'use client'
import { useEffect } from 'react'

export default function RiderSimulator() {
  useEffect(() => {
    const ch = new BroadcastChannel('ride_channel')

    function onmsg(ev: MessageEvent) {
      const msg = ev.data
      if (!msg || msg.type !== 'ride_requested') return
      // simulate a rider accepting after 2-6 seconds
      const delay = 2000 + Math.round(Math.random() * 4000)
      setTimeout(() => {
        const update = { type: 'ride_update', rideId: msg.ride.id, status: 'accepted', riderId: msg.ride.riderId }
        ch.postMessage(update)
      }, delay)
    }

    ch.addEventListener('message', onmsg)
    return () => ch.close()
  }, [])

  return null
}
