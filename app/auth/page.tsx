'use client'
import { useRouter } from 'next/navigation'
import AuthForm from '../../app/components/AuthForm'
import Navbar from '../components/Navbar'

export default function AuthPage() {
  const router = useRouter()
  return (
    <>
      <main className='flex flex-col items-center'>
        <p className='text-lg mb-5'>Sign In</p>
        <AuthForm initialMode='login' />
        <div className='fixed bottom-0 pb-4'>
          <span className='text-xs'>Not a member? </span>
          <button className='text-xs cursor-pointer text-blue-800' onClick={() => router.push('/auth/signup')}>Register now</button>
        </div>
      </main>
    </>
  )
}
