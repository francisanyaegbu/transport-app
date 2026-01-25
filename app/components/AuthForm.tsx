// ...existing code...
"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'
import { User, Phone, Envelope, Key } from '@phosphor-icons/react'
import Link from 'next/link'

type User = {
  id: string
  email: string
  password: string
  role?: string
  name?: string
  phone?: string
  avatar_url?: string
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

// ...existing code...
export default function AuthForm({ initialMode = 'login' }: { initialMode?: 'login' | 'signup' }) {
  const [mode] = useState<'login' | 'signup'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
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
      // store profile locally so Profile page can read it (fallback / quick access)
    try {
          const users = readUsers()
          const newUser: User = { id: data?.user?.id ?? 'u_' + Date.now(), email, password, role: 'student', name, phone }
          users.push(newUser)
          writeUsers(users)
          localStorage.setItem('mock_session', newUser.id)
        } catch {}
         router.push('/dashboard')
         return
       }
 
       const { error } = await supabase.auth.signInWithPassword({ email, password })
       if (error) {
         alert(error.message)
         return
       }
      // on successful sign-in, ensure local session/profile is set if present
      try {
        const users = readUsers()
        const found = users.find((u) => u.email === email)
        if (found) localStorage.setItem('mock_session', found.id)
      } catch {}
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
        const newUser: User = { id: 'u_' + Date.now(), email, password, role: 'student', name, phone }
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
 
 
   return (
     <div className='w-full flex flex-col px-5'>
      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div style={{ marginBottom: 8 }}>
            <div className='flex items-center border border-gray-300 px-3 rounded-md mb-2'>
              <User size={15} />
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='w-full text-sm' placeholder='Full name' />
            </div>
            <div className='flex items-center border border-gray-300 px-3 rounded-md'>
              <Phone size={15} />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className='w-full text-sm' placeholder='Phone' />
            </div>
          </div>
        )}
        <div style={{ marginBottom: 8 }}>
          <div className='flex items-center border border-gray-300 px-3 rounded-md'>
            <Envelope size={15} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='w-full text-sm' placeholder='Email' />
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div className='flex items-center border border-gray-300 px-3 rounded-md'>
            <Key size={15} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='w-full text-sm' placeholder='Password' />
          </div>
          {mode === 'login' && (
            <div className="text-right mt-2">
              <Link href="/forgot" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
            </div>
          )}
        </div>
        {mode === 'signup' && (
          <p className='text-xs text-center text-neutral-500'>
            By signing up, you agree to our 
            <a href="/terms" className="text-blue-600 hover:underline"> Terms of Service </a> 
            and <a href="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</a>
          </p>
        )}
        <button
           className='text-sm mt-5 bg-blue-600 text-white hover:bg-blue-800 duration-200 text-nowrap py-2 cursor-pointer w-full text-center rounded-md' type="submit">
           {mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>
      {/* <p className='text-xs text-center mt-4 text-gray-400'>Or Continue with</p>
      <div className='mt-3'>
        <button onClick={handleGoogleSignIn} className='flex items-center gap-3 text-xs mt-2 bg-gray-200 px-4 py-1.5 cursor-pointer text-center rounded-xl justify-center'>
          <GoogleLogo size={20} />
          Google
        </button>
      </div> */}
     </div>
   )
}
// ...existing code...