"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../lib/supabaseClient'

export const Page = () => {
  const router = useRouter()

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch {
      // ignore errors
    }
    localStorage.removeItem('role')
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen p-6" style={{backgroundColor:'#0f172a'}}>
        <div className='max-w-2xl mx-auto'>
            <div className='flex items-center justify-between mb-4'>
              <h1 className='text-2xl font-semibold text-white'>Ride History</h1>
              <button onClick={signOut} className="py-2 px-3 rounded" style={{backgroundColor:'#ef4444', color:'white'}}>Sign Out</button>
            </div>
            <div className="rounded-xl border p-5 mt-5" style={{backgroundColor:'#1e293b', borderColor:'#334155'}}>
                <p style={{color:'#8d9baf'}}>No rides yet — this will display past trips.</p>
            </div>
        </div>
    </div>
  )
}

export default Page