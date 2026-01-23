'use client'
import { useState, useRef } from 'react'
import { Camera } from 'lucide-react'

export default function ProfileForm() {
  const [name, setName] = useState('')
  const [role, setRole] = useState<'student'|'rider'>('student')
  const [imageUrl, setImageUrl] = useState('https://res.cloudinary.com/drpu2ycu6/image/upload/Francis.Anyaegbu/Image_4_tv2j4u.png')
  const fileInputRef = useRef<HTMLInputElement>(null)

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
          style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${imageUrl})`}}>
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
          <input type="tel" placeholder='+234 123 456 78' />

          <label htmlFor="email">Email</label>
          <input type="email" placeholder='example@gmail.com' />
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