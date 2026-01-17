"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function readUsers() {
  try {
    const raw = localStorage.getItem('mock_users')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeUsers(users: any[]) {
  localStorage.setItem('mock_users', JSON.stringify(users))
}

export default function AuthForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
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
      if (users.find((u: any) => u.email === email)) {
        alert('User already exists')
        return
      }
      const newUser = { id: 'u_' + Date.now(), email, password, role: 'student', name: '' }
      users.push(newUser)
      writeUsers(users)
      localStorage.setItem('mock_session', newUser.id)
      router.push('/dashboard')
      return
    }

    // login
    const found = users.find((u: any) => u.email === email && u.password === password)
    if (!found) {
      alert('Invalid credentials')
      return
    }
    localStorage.setItem('mock_session', found.id)
    router.push('/dashboard')
  }

  return (
    <div style={{ maxWidth: 420, marginTop: 12 }}>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setMode('login')} style={{ marginRight: 8 }}>Login</button>
        <button onClick={() => setMode('signup')}>Sign up</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={{ width: '100%' }} />
        </div>
        <button type="submit">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
      </form>
    </div>
  )
}
