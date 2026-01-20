'use client'
import { useRouter } from 'next/navigation'
import AuthForm from '../../app/components/AuthForm'
import Navbar from '../components/Navbar'

export default function AuthPage() {
  const router = useRouter()
  return (
    <>
      <main className='flex flex-col items-center w-full py-20'>
        <Navbar />
        <h1 className='text-4xl font-semibold mb-5'>Welcome back!</h1>
        <p className='text-lg mb-5'>Login now</p>
        <AuthForm initialMode='login' />
        <div className='mt-4'>
          <span className='text-sm'>Not a member? </span>
          <button className='text-sm cursor-pointer' onClick={() => router.push('/auth/signup')}>Register now</button>
        </div>
      </main>
    </>
  )
}
