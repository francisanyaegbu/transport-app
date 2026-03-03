'use client'
import { useRouter } from 'next/navigation'
import supabase from '../../lib/supabaseClient'

export const page = () => {
  const router = useRouter()
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.debug('signout', err)
    }
    localStorage.removeItem('role')
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen p-6 pb-24" style={{backgroundColor:'#0f172a'}}>
      <div className="max-w-md mx-auto rounded-xl p-6" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
        <h1 className="text-2xl font-semibold text-white mb-4">Settings</h1>
        <p style={{color:'#8d9baf'}}>Settings will go here.</p>
        <div className="mt-6">
          <button onClick={signOut} className="btn w-full py-3 px-4 rounded-lg font-semibold" style={{backgroundColor:'#ef4444', color:'white'}}>Sign Out</button>
        </div>
      </div>
    </div>
  )
}

export default page
