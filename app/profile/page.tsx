"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../lib/supabaseClient'

const Page = () => {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser()
        if (!user) {
          router.push('/auth/login')
          return
        }
        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (!error && data) {
          // include auth email for display
          setProfile({ ...data, email: user.email })
        }
      } catch (err) {
        console.debug('profile fetch', err)
      }
    }
    load()
  }, [router])

  return (
    <div className="min-h-screen p-6 pb-24" style={{backgroundColor:'#0f172a'}}>
      <div className="max-w-md mx-auto rounded-xl p-6" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
        <h1 className="text-2xl font-semibold text-white mb-4">Profile</h1>
        {profile ? (
          <div className="space-y-3 text-white">
            <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>            {profile.email && <p><strong>Email:</strong> {profile.email}</p>}            {profile.phone && <p><strong>Phone:</strong> {profile.phone}</p>}
            {profile.role && <p><strong>Role:</strong> {profile.role}</p>}
            {profile.vehicle_type && <p><strong>Vehicle:</strong> {profile.vehicle_type}</p>}
            {profile.license_plate && <p><strong>License plate:</strong> {profile.license_plate}</p>}
            {profile.vest_number && <p><strong>Vest #:</strong> {profile.vest_number}</p>}
          </div>
        ) : (
          <p style={{color:'#8d9baf'}}>Loading your information...</p>
        )}
      </div>
    </div>
  )
}

export default Page
