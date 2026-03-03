'use client'

import { Clock, UserCircle } from "@phosphor-icons/react";
import  Link  from "next/link";
import { useEffect, useState } from "react";
import supabase from '../../lib/supabaseClient'

interface Rider {
  id: number;
  name: string;
  rating: number;
  vehicle: string;
}

interface RideRequest {
  id: string;
  pickup: string;
  destination: string;
  riderName?: string;
}

export const Dashboard = () => {
  const [role] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('role')
    }
    return null
  })
  const [lastName, setLastName] = useState<string>('')
  const [nearbyRiders] = useState<Rider[]>([])

  // Rider-specific state
  const [isOnline, setIsOnline] = useState(false)
  const [requests, setRequests] = useState<RideRequest[]>([
    { id: 'r1', pickup: 'North Gate', destination: 'Library', riderName: 'Alice' },
    { id: 'r2', pickup: 'Cafeteria', destination: 'Dorm A', riderName: 'Bob' }
  ])

  // fetch last name for greeting
  useEffect(() => {
    const getName = async () => {
      try {
        const user = (await supabase.auth.getUser()).data.user
        if (user) {
          const { data, error } = await supabase.from('profiles').select('last_name').eq('id', user.id).single()
          if (!error && data?.last_name) setLastName(data.last_name)
        }
      } catch (err) {
        console.debug('name fetch', err)
      }
    }
    getName()
  }, [])

  // Heartbeat / ping for riders: update presence in Supabase periodically (optional)
  useEffect(() => {
    if (role !== 'rider') return
    let mounted = true
    const interval = setInterval(async () => {
      try {
        // Attempt to upsert presence; requires a table (example: rider_presence)
        await supabase.from('rider_presence').upsert({
          id: 'local-rider',
          online: isOnline,
          last_seen: new Date().toISOString()
        })
      } catch (err) {
        // ignore errors locally - table may not exist; keep console for debugging
        if (mounted) console.debug('heartbeat', err)
      }
    }, 15000)

    return () => { mounted = false; clearInterval(interval) }
  }, [role, isOnline])

  const acceptRequest = (id: string) => {
    setRequests((r) => r.filter(req => req.id !== id))
    // TODO: notify backend that request was accepted
  }

  const declineRequest = (id: string) => {
    setRequests((r) => r.filter(req => req.id !== id))
    // TODO: notify backend that request was declined
  }

  if (role === 'rider') {
    return (
      <div style={{backgroundColor:'#0f172a'}} className="min-h-screen pb-10">
        <div className='flex items-center justify-between p-3 px-5' style={{backgroundColor:'#162033'}}>
            <div>
                <p className="text-nowrap">Rider dashboard</p>
            </div>
            <div className='flex items-center gap-3'>
                <Link href="/history" style={{backgroundColor:'#334155' }} className="p-2 rounded-xl cursor-pointer"><Clock size={25} /></Link>
                <Link href="/profile" style={{backgroundColor:'#10b981' }} className="p-2 rounded-xl cursor-pointer"><UserCircle size={25} /></Link>
            </div>
        </div>

        <div className="px-5 mt-6">
          <div className="max-w-md mx-auto rounded-xl p-6" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <h2 className="text-white text-xl font-semibold mb-4">Status</h2>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsOnline(true)} className={`btn py-2 px-4 rounded ${isOnline ? 'font-bold' : ''}`} style={{ backgroundColor: isOnline ? '#10b981' : '#334155', color: 'white' }}>Go Online</button>
              <button onClick={() => setIsOnline(false)} className={`btn py-2 px-4 rounded ${!isOnline ? 'font-bold' : ''}`} style={{ backgroundColor: !isOnline ? '#ef4444' : '#334155', color: 'white' }}>Go Offline</button>
              <div style={{color:'#8d9baf'}}>{isOnline ? 'Online' : 'Offline'}</div>
            </div>
          </div>

          <div className="max-w-md mx-auto rounded-xl p-6 mt-6" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <h2 className="text-white text-xl font-semibold mb-4">Ride Requests</h2>
            {requests.length === 0 ? (
              <p style={{color:'#8d9baf'}}>No pending requests</p>
            ) : (
              <div className="space-y-4">
                {requests.map(r => (
                  <div key={r.id} className="p-4 rounded-lg" style={{backgroundColor:'#162033', border:'1px solid #334155'}}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">{r.riderName || 'Rider'}</p>
                        <p className="text-sm" style={{color:'#8d9baf'}}>{r.pickup} → {r.destination}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => acceptRequest(r.id)} className="btn py-1 px-3 rounded" style={{backgroundColor:'#10b981', color:'white'}}>Accept</button>
                        <button onClick={() => declineRequest(r.id)} className="btn py-1 px-3 rounded" style={{backgroundColor:'#334155', color:'white'}}>Decline</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{backgroundColor:'#0f172a'}} className="min-h-screen pb-10">
        <div className='flex items-center justify-between p-3 px-5' style={{backgroundColor:'#162033'}}>
            <div>
                <p className="text-nowrap">Good to see you,</p>
                <p className='text-2xl font-bold text-nowrap'>{lastName || 'user'}</p>
            </div>
            <div className='flex items-center gap-3'>
                <Link href="/history" style={{backgroundColor:'#334155' }} className="p-2 rounded-xl cursor-pointer"><Clock size={25} /></Link>
                <Link href="/profile" style={{backgroundColor:'#10b981' }} className="p-2 rounded-xl cursor-pointer"><UserCircle size={25} /></Link>
            </div>
        </div>
        <hr style={{color:'#334155'}} className="mb-5" />
        <div className="flex justify-center px-5 mb-10">
            <div className="w-full max-w-md rounded-xl p-6" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                <h1 className='text-xl font-semibold text-white mb-4'>Request a ride</h1>

                <label htmlFor="pickup" className="text-sm text-neutral-400">Pickup location</label>
                <input id="pickup" type="text" placeholder="Enter pickup location" className="w-full px-4 py-3 rounded-lg bg-[#1a2332] text-white border border-[#323f4e] placeholder-neutral-500 focus:border-[#10b981] focus:outline-none mb-3" />

                <label htmlFor="destination" className="text-sm text-neutral-400">Destination</label>
                <input id="destination" type="text" placeholder="Enter destination" className="w-full px-4 py-3 rounded-lg bg-[#1a2332] text-white border border-[#323f4e] placeholder-neutral-500 focus:border-[#10b981] focus:outline-none mb-4" />

                <button className="btn w-full py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: '#10b981' }}>
                    Find Riders Nearby
                </button>
            </div>
        </div>

        <div className="px-5">
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="text-white text-xl font-semibold">Nearby Riders</h1>
                    <h1 className="text-sm" style={{color:'#4b658b'}}>{nearbyRiders.length} available</h1>
                </div>
                <div className="rounded-xl border p-5 mt-5" style={{backgroundColor:'#1e293b', borderColor:'#334155'}}>
                    {nearbyRiders.length > 0 ? (
                      <div className="space-y-4">
                        {nearbyRiders.map((rider) => (
                          <div key={rider.id} className="p-4 rounded-lg" style={{backgroundColor:'#162033', border:'1px solid #334155'}}>
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-white font-semibold">{rider.name}</p>
                                <p className="text-sm" style={{color:'#8d9baf'}}>{rider.vehicle}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                <p className="text-white text-sm">{rider.rating}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <p className="text-white text-lg font-semibold mb-2">No riders available right now</p>
                        <p style={{color:'#8d9baf'}}>Check back soon!</p>
                      </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard