'use client'
import { useState } from 'react'

export default function ProfileForm() {
  const [name, setName] = useState('')
  const [role, setRole] = useState<'student'|'rider'>('student')

  return (
    <form style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 8 }}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="student">Student</option>
          <option value="rider">Rider</option>
        </select>
      </div>
      <button type="submit">Save profile</button>
    </form>
  )
}
