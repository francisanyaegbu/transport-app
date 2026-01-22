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
      <main className="flex min-h-fit flex-col pt-10 px-5 mx-auto mt-15 mb-5 overflow-x-hidden">
        <h1 className="text-xl font-semibold mb-8">Settings</h1>
        <div className='flex items-center justify-between border-b border-gray-300 mb-5'>
          <div className="flex items-center gap-4 mb-6">

            <div
              className={`w-12 h-12 rounded-full relative bg-cover bg-center`}
              style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(https://res.cloudinary.com/drpu2ycu6/image/upload/Francis.Anyaegbu/Image_4_tv2j4u.png)'}}>
            </div>

            <div>
              <p className="text-sm text-neutral-400">Welcome</p>
              <p className='font-semibold'>username</p>
            </div>

          </div>
          <p className='cursor-pointer'><SignOut size={18} /></p>
        </div>

        <div className='flex flex-col gap-5'>
          <Link href='/profile' className='border-b border-gray-300 pb-4 flex items-center justify-between text-sm font-semibold cursor-pointer'>
            <div className='flex items-center gap-3'>
              <UserCircle size={25} weight='light' color='gray' />
              User Profile
            </div>
            <GreaterThan size={12} />
          </Link>
          <div className='border-b border-gray-300 pb-4 flex items-center justify-between text-sm font-semibold cursor-pointer'>
            <Link href='' className='flex items-center gap-3'>
              <Lock size={25} weight='light' color='gray' />
              Change Password
            </Link>
            <GreaterThan size={12} />
          </div>
          <div className='border-b border-gray-300 pb-4 flex items-center justify-between text-sm font-semibold cursor-pointer'>
            <div className='flex items-center gap-3'>
              <Question size={25} weight="light" color='gray' />
              FAQ
            </div>
            <GreaterThan size={12} />
          </div>
          <div className='border-b border-gray-300 pb-4 flex items-center justify-between text-sm font-semibold cursor-pointer'>
            <div className='flex items-center gap-3'>
              <BellSimpleRinging size={25} weight="light" color='gray' />
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
        </div>

        <div className='mt-10 bg-blue-100 rounded-md p-5 flex flex-col items-center'>
          <p className='text-xs text-center'>If you have any query you <br /> can reach out to us.</p>
          <p onClick={()=>window.open('https://wa.link/0yynti') } className='cursor-pointer text-sm mt-7 text-blue-950'>Whatsapp us</p>
        </div>
      </main>
    </>
  )
}
