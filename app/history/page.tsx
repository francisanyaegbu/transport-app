import React from 'react'

export const page = () => {
  return (
    <div style={{backgroundColor:'#0f172a'}} className="min-h-screen p-6 pb-24">
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-2xl font-semibold text-white'>Ride History</h1>
        <div className="rounded-xl border p-5 mt-5" style={{backgroundColor:'#1e293b', borderColor:'#334155'}}>
          <p style={{color:'#8d9baf'}}>No rides yet — this will display past trips.</p>
        </div>
      </div>
    </div>
  )
}

export default page
