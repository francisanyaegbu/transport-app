'use client'
import { useRouter } from 'next/navigation'
import AuthForm from '../../../app/components/AuthForm'

export default function SignupPage() {
  const router = useRouter()
  return (
    <main className='flex flex-col items-center py-20'>
      <h1 className='text-4xl font-semibold mb-5'>Create an account</h1>
      <p className='text-lg mb-5'>Sign up to get started</p>
      <AuthForm initialMode='signup' />
      <div className='mt-4'>
        <span className='text-sm'>Already have an account? </span>
        <button className='text-sm cursor-pointer' onClick={() => router.push('/auth')}>Sign in</button>
      </div>
    </main>
  )
}
