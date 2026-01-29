'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../../app/components/Navbar'
import { mockRiders } from '../../app/lib/mockRiders'

type StoredRide = {
  id: string
  riderId?: string
  studentId?: string
  origin?: string
  destination?: string
  status?: string
  requestedAt?: number
  startedAt?: number
  completedAt?: number
  fare?: number
}

export default function HistoryPage() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const [rides, setRides] = useState<StoredRide[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mock_rides')
      const arr: StoredRide[] = raw ? JSON.parse(raw) : []
      // sort newest first
      arr.sort((a, b) => (b.requestedAt || 0) - (a.requestedAt || 0))
      setRides(arr)
    } catch (e) {
      setRides([])
    }

    const onStorage = () => {
      try {
        const raw = localStorage.getItem('mock_rides')
        const arr: StoredRide[] = raw ? JSON.parse(raw) : []
        arr.sort((a, b) => (b.requestedAt || 0) - (a.requestedAt || 0))
        setRides(arr)
      } catch {
        setRides([])
      }
    }

    window.addEventListener('storage', onStorage)
    const ch = new BroadcastChannel('ride_channel')
    ch.addEventListener('message', onStorage)
    return () => { window.removeEventListener('storage', onStorage); ch.close() }
  }, [])

  function formatTs(ts?: number) {
    if (!ts) return '—'
    return new Date(ts).toLocaleString()
  }

  function getRider(riderId?: string) {
    return mockRiders.find(r => r.id === riderId)
  }

  return (
    <>
      <Navbar />
      <main className='mt-20 px-5 '>

        <div className='history-time flex items-center justify-between mb-5 border rounded-md border-gray-300 w-full'>
          {/* filter by time range - (1W, 1M, 3M, 6M) - functionality can be added later */}
          <p className='cursor-pointer'>1W</p>
          <p className='cursor-pointer'>1M</p>
          <p className='cursor-pointer'>3M</p>
          <p className='cursor-pointer'>6M</p>
        </div>

        <div>
          {/* Display the current date being shown */}
          <p className='text-lg font-semibold mb-4'>{formattedDate}</p>

          {/* List rides - map through rides and display details */}
          <div className='flex flex-col gap-3'>
            {rides.length === 0 && <p className='text-gray-500'>No rides found for the selected period.</p>}

            {rides.map((ride) => {
              const rider = getRider(ride.riderId)
              const riderName = rider ? rider.name : 'Unknown rider'
              const profileLink = rider ? `/rider/${rider.id}` : '#'
              const timeLabel = ride.startedAt ? `Started: ${formatTs(ride.startedAt)}` : `Booked: ${formatTs(ride.requestedAt)}`
              const price = ride.fare ?? (ride as any).price ?? (ride as any).amount ?? null

              return (
                <div key={ride.id} className='flex items-center justify-between rounded-md p-3 shadow-md shadow-gray-200 bg-white'>
                  <div className='flex items-center gap-3'>
                    {/* profile picture placeholder (could become an <img /> if avatars are added) */}
                    <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold'>
                      {rider ? rider.name.split(' ').map(s => s[0]).slice(0,2).join('') : '—'}
                    </div>

                    <div className='text-sm'>
                      {/* Rider name links to rider profile */}
                      <Link href={profileLink} className='font-medium hover:underline'>{riderName}</Link>

                      {/* Origin → Destination */}
                      <div className='text-gray-500 text-xs'>
                        {ride.origin || 'Unknown origin'} → {ride.destination || 'Unknown destination'}
                      </div>

                      {/* Time - shows booked or started */}
                      <div className='text-gray-500 text-xs'>{timeLabel}</div>
                    </div>
                  </div>

                  {/* Price on the right */}
                  <div className='text-sm font-semibold'>
                    {price != null ? `$${price.toFixed ? price.toFixed(2) : price}` : '—'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
