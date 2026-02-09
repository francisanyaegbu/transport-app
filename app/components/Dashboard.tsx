'use client'

import { Clock, UserCircle } from "@phosphor-icons/react";
import  Link  from "next/link";
import { useState } from "react";

interface Rider {
  id: number;
  name: string;
  rating: number;
  vehicle: string;
}

export const Dashboard = () => {
  // Sample nearby riders - replace with real data fetching
  const [nearbyRiders] = useState<Rider[]>([
    // { id: 1, name: "John Doe", rating: 4.8, vehicle: "Blue Honda Civic" },
    // { id: 2, name: "Jane Smith", rating: 4.9, vehicle: "Silver Toyota Camry" },
  ]);

  return (
    <div style={{backgroundColor:'#0f172a'}} className="min-h-screen pb-10">
        <div className='flex items-center justify-between p-3 px-5' style={{backgroundColor:'#162033'}}>
            <div>
                <p className="text-nowrap">Good to see you,</p>
                <p className='text-2xl font-bold text-nowrap'>user.firstname</p>
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

                <button className="w-full py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: '#10b981' }}>
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