'use client'

import { Envelope } from '@phosphor-icons/react'

export const page = () => {
  return (
    <div className='px-7 mt-25'>
      <h1 className="text-center text-xl mb-4 text-blue-950">Forget Password</h1>
      <p className="text-center text-xs text-gray-400 mb-6">Don&apos;t worry it happens. Enter the email address associated with your account.</p>
      <div className='flex items-center border border-gray-300 px-3 rounded-md'>
        <Envelope size={15} />
        <input type="email" className='w-full text-sm' placeholder='Email' />
      </div>
      <button
          className='text-sm mt-5 bg-blue-600 text-white hover:bg-blue-800 duration-200 text-nowrap py-2 cursor-pointer w-full text-center rounded-md' type="submit">
          Send OTP
      </button>
    </div>
  )
}

export default page