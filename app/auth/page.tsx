'use client'
import { useRouter } from 'next/navigation'
import AuthForm from '../../app/components/AuthForm'

export default function AuthPage() {
  const router = useRouter()
  return (
    <>
      <main className='flex flex-col items-center mt-25'>
        <p className='text-xl mb-5 text-blue-950'>Sign In</p>
        <AuthForm initialMode='login' />
        <div className='fixed bottom-0 pb-4'>
          <span className='text-xs'>Not a member? </span>
          <button className='text-xs cursor-pointer text-blue-800' onClick={() => router.push('/auth/signup')}>Register now</button>
        </div>
      </main>
    </>
  )
}
