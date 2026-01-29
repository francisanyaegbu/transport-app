'use client'

import { useState } from 'react'
import Navbar from '../../app/components/Navbar'
import { SignOut, UserCircle, Lock, Question, BellSimpleRinging, GreaterThan } from '@phosphor-icons/react'
import Link from 'next/link'

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <>
      <Navbar />
      <main className="flex min-h-fit flex-col px-5 mx-auto mt-25 mb-20 overflow-x-hidden">
        <div className='flex flex-col gap-5'>
          <Link href='/profile' className='border-b border-gray-300 pb-4 flex items-center justify-between text-sm font-semibold cursor-pointer'>
            <div className='flex items-center gap-3'>
              <UserCircle size={25} weight='light' color='blue' />
              User Profile
            </div>
            <GreaterThan size={12} />
          </Link>
          <div className='border-b border-gray-300 pb-4 flex items-center justify-between text-sm font-semibold cursor-pointer'>
            <Link href='' className='flex items-center gap-3'>
              <Lock size={25} weight='light' color='blue' />
              Change Password
            </Link>
            <GreaterThan size={12} />
          </div>
          <div className='border-b border-gray-300 pb-4 flex items-center justify-between text-sm font-semibold cursor-pointer'>
            <div className='flex items-center gap-3'>
              <Question size={25} weight="light" color='blue' />
              FAQ
            </div>
            <GreaterThan size={12} />
          </div>
          <div className='border-b border-gray-300 pb-4 flex items-center justify-between text-sm font-semibold cursor-pointer'>
            <div className='flex items-center gap-3'>
              <BellSimpleRinging size={25} weight="light" color='blue' />
              Notification
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                aria-label="Toggle notifications"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>
          <div className='border-b border-gray-300 pb-4 flex items-center gap-3 text-sm font-semibold text-red-600 cursor-pointer'>
            <p className='cursor-pointer'><SignOut size={25} /></p>
            Signout
          </div>
        </div>

        <div className='mt-10 bg-blue-100 rounded-md p-5 flex flex-col items-center'>
          <p className='text-xs text-center'>If you have any query you <br /> can reach out to us.</p>
          <p onClick={()=>window.open('https://wa.link/0yynti') } className='cursor-pointer text-sm mt-7 text-blue-950'>Whatsapp us</p>
        </div>
      </main>
    </>
  )
}
