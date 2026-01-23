"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '../lib/supabaseClient'
import { account } from '../lib/appwriteClient'

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
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const router = useRouter()

 function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string)
     }
     reader.readAsDataURL(file)
   }
 }

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
          const newUser: User = { id: data?.user?.id ?? 'u_' + Date.now(), email, password, role: 'student', name, phone, avatar_url: avatarPreview }
          users.push(newUser)
          writeUsers(users)
          localStorage.setItem('mock_session', newUser.id)
        } catch {}
         router.push('/dashboard')
         return
       }
 
       const { data, error } = await supabase.auth.signInWithPassword({ email, password })
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
        const newUser: User = { id: 'u_' + Date.now(), email, password, role: 'student', name, phone, avatar_url: avatarPreview }
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
        {mode === 'signup' && (
          <div style={{ marginBottom: 8 }}>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" style={{ width: '100%' }} placeholder='Full name' />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" style={{ width: '100%', marginTop: 8 }} placeholder='Phone (optional)' />
            <div style={{ marginTop: 8 }}>
              <input onChange={handleImageChange} type="file" accept="image/*" />
              {avatarPreview && <Image src={avatarPreview} alt="preview" width={48} height={48} style={{ borderRadius: 24, marginTop: 8 }} />}
            </div>
          </div>
        )}
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