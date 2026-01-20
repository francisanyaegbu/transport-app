"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      alert('Please provide email and password')
      return
    }

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

    // login
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      alert('Invalid credentials')
      return
    }
    localStorage.setItem('mock_session', found.id)
    router.push('/dashboard')
  }

  return (
    <div style={{ maxWidth: 420, marginTop: 12 }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" style={{ width: '100%' }} placeholder='Email' />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={{ width: '100%' }} placeholder='Password' />
        </div>
        <button
        className='text-sm mt-5 bg-black text-white px-4 py-1.5 cursor-pointer w-full text-center rounded-xl' type="submit">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
      </form>
    </div>
  )
}
