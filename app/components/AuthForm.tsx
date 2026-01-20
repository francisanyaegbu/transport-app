"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'
import { account } from '../lib/appwriteClient'

type User = {
  id: string
  email: string
  password: string
  role?: string
  name?: string
}

function readUsers(): User[] {
  try {
    const raw = localStorage.getItem('mock_users')
    return raw ? JSON.parse(raw) as User[] : []
  } catch {
    return []
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem('mock_users', JSON.stringify(users))
}

export default function AuthForm({ initialMode = 'login' }: { initialMode?: 'login' | 'signup' }) {
  const [mode] = useState<'login' | 'signup'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      alert('Please provide email and password')
      return
    }

    // Use Supabase for auth
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) {
          alert(error.message)
          return
        }
        router.push('/dashboard')
        return
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        alert(error.message)
        return
      }
      router.push('/dashboard')
      return
    } catch (err) {
      // fallback to local mock users if Supabase not configured
      const users = readUsers()
      if (mode === 'signup') {
        if (users.find((u) => u.email === email)) {
          alert('User already exists')
          return
        }
        const newUser: User = { id: 'u_' + Date.now(), email, password, role: 'student', name: '' }
        users.push(newUser)
        writeUsers(users)
        localStorage.setItem('mock_session', newUser.id)
        router.push('/dashboard')
        return
      }
      const found = users.find((u) => u.email === email && u.password === password)
      if (!found) {
        alert('Invalid credentials')
        return
      }
      localStorage.setItem('mock_session', found.id)
      router.push('/dashboard')
    }
  }

  function handleGoogleSignIn() {
    try {
      const success = window.location.origin + '/dashboard'
      const failure = window.location.origin + '/auth'
      account.createOAuth2Session('google', success, failure)
    } catch (err) {
      console.error(err)
      alert('Google sign-in failed')
    }
  }

  return (
    <div className='w-full flex flex-col px-20'>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" style={{ width: '100%' }} placeholder='Email' />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={{ width: '100%' }} placeholder='Password' />
        </div>
        <button
          className='text-sm mt-5 bg-black text-white px-4 py-1.5 cursor-pointer w-full text-center rounded-xl' type="submit">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>
      <div className='mt-3'>
        <button onClick={handleGoogleSignIn} className='w-full text-sm mt-2 border px-4 py-2 rounded-xl'>Sign in with Google</button>
      </div>
    </div>
  )
}
