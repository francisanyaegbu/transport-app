'use client'
import { useRouter } from 'next/navigation'
import AuthForm from '../../../app/components/AuthForm'

export default function SignupPage() {
  const router = useRouter()
  return (
    <main className='flex flex-col items-center'>
      <p className='text-lg mb-5'>Sign up</p>
      <AuthForm initialMode='signup' />
      <div className='fixed bottom-0 pb-4'>
        <span className='text-xs'>Already have an account? </span>
        <button className='text-xs cursor-pointer text-blue-800' onClick={() => router.push('/auth')}>Sign in</button>
      </div>
    </main>
  )
}
