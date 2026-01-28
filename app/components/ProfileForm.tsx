'use client'
import { useState, useRef, useEffect } from 'react'
import { Camera } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

export default function ProfileForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState<'student'|'rider'>('student')
  const [imageUrl, setImageUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function loadProfile() {
      // try Supabase user metadata first
      try {
        const { data } = await supabase.auth.getUser()
       const user = data?.user
       if (user) {
         const meta = ((user.user_metadata ?? user.user_metadata) || {}) as { name?: string; avatar_url?: string }
         setName(meta.name || (user.email ?? '').split('@')[0] || '')
         setImageUrl(meta.avatar_url || '')
         return
        }
      } catch {}
      // fallback to local mock session/users
      try {
        const sessionId = localStorage.getItem('mock_session')
        if (sessionId) {
          const raw = localStorage.getItem('mock_users')
          const users = raw ? JSON.parse(raw) : []
        const me = users.find((u: unknown) => {
          if (typeof u === 'object' && u !== null && 'id' in u) {
            return (u as { id: string }).id === sessionId
          }
          return false
        }) as { name?: string; avatar_url?: string } | undefined
          if (me) {
            setName(me.name || '')
            setImageUrl(me.avatar_url || '')
          }
        }
      } catch {}
    }
    loadProfile()
  }, [])

  // compute default letter avatar
  function getLetterAvatar(name: string) {
    const letter = (name?.trim()?.[0] || 'U').toUpperCase()
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='#E5E7EB'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica, Arial, sans-serif' font-size='96' fill='#111827'>${letter}</text></svg>`
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0]
     if (file) {
       const reader = new FileReader()
       reader.onload = (event) => {
         setImageUrl(event.target?.result as string)
       }
       reader.readAsDataURL(file)
     }
   }

   const handleCameraClick = () => {
     fileInputRef.current?.click()
   }

   return (
     <div className="flex flex-col items-center justify-center">
       <div className="relative w-20 h-20">
         <div
           className="w-full h-full rounded-full bg-cover bg-center border-4 border-gray-300 shadow-lg"
          style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${imageUrl || getLetterAvatar(name)})`}}>
         </div>
         <button
           onClick={handleCameraClick}
           className="absolute bottom-1 right-1 bg-white hover:bg-gray-200 text-white rounded-full p-1 shadow-md transition-colors"
           type="button">
           <Camera size={10} color='black' />
         </button>
         <input
           ref={fileInputRef}
           type="file"
           accept="image/*"
           onChange={handleImageChange}
           className="hidden"
         />
       </div>
       <form className="w-full p-6">
        <div className='mb-4'>
          <label htmlFor="name">Full name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe' />
          
          <label htmlFor="phone">Phone number</label>
          <input type="tel" placeholder='+234 123 456 78' value={phone} onChange={(e) => setPhone(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

         
        <div style={{ marginBottom: 16 }}>
           <label htmlFor='role'>Role</label>
           <select value={role} onChange={(e) => setRole(e.target.value as never)} >
             <option value="student">Student</option>
             <option value="rider">Rider</option>
           </select>
        </div>

        <button type="submit" className='save-profile'>Save profile</button>
       </form>
     </div>
   )
 }