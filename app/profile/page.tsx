'use client'

import Navbar from '../../app/components/Navbar'
import ProfileForm from '../../app/components/ProfileForm'
// import { ArrowLeft } from '@phosphor-icons/react'

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-fit flex-col pt-10 px-5 mx-auto mt-15 mb-5 overflow-x-hidden">
          <h1 className="text-md mb-8 text-center">User profile</h1>
        <ProfileForm />
      </main>
    </>
  )
}
