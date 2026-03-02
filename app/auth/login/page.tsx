'use client'

import { Lightning, ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import supabase from '../../../lib/supabaseClient'

type SignUpType = 'student' | 'rider' | null;

const InputField = ({ 
  id, 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange
}: { 
  id: string; 
  label: string; 
  type?: string; 
  placeholder: string,
  value?: string,
  onChange?: (v: string) => void
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-semibold text-white">{label}</label>
    <input 
      type={type} 
      id={id}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder} 
      className="w-full px-4 py-3 rounded-lg text-white border transition-colors placeholder-neutral-500 focus:outline-none"
      style={{ 
        backgroundColor: '#1a2332',
        borderColor: '#323f4e'
      }}
    />
  </div>
);

export const Page = () => {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [signUpType, setSignUpType] = useState<SignUpType>(null);

  // Student fields
  const [sFirst, setSFirst] = useState('')
  const [sLast, setSLast] = useState('')
  const [sEmail, setSEmail] = useState('')
  const [sPhone, setSPhone] = useState('')
  const [sPass, setSPass] = useState('')

  // Rider fields
  const [rFirst, setRFirst] = useState('')
  const [rLast, setRLast] = useState('')
  const [rEmail, setREmail] = useState('')
  const [rPhone, setRPhone] = useState('')
  const [rVType, setRVType] = useState('')
  const [rPlate, setRPlate] = useState('')
  const [rVest, setRVest] = useState('')
  const [rPass, setRPass] = useState('')

  const handleStudentSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({ email: sEmail, password: sPass })
      if (error) throw error
      // optional: create profile row if you have a profiles table
      try {
        await supabase.from('profiles').insert({
          id: data.user?.id,
          first_name: sFirst,
          last_name: sLast,
          phone: sPhone,
          role: 'student'
        })
      } catch (_) {}

      localStorage.setItem('role', 'student')
      router.push('/home')
    } catch (err) {
      console.error('signup error', err)
      // fallback: still navigate locally
      localStorage.setItem('role', 'student')
      router.push('/home')
    }
  }

  const handleRiderSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({ email: rEmail, password: rPass })
      if (error) throw error
      try {
        await supabase.from('profiles').insert({
          id: data.user?.id,
          first_name: rFirst,
          last_name: rLast,
          phone: rPhone,
          vehicle_type: rVType,
          plate: rPlate,
          vest_number: rVest,
          role: 'rider'
        })
      } catch (_) {}

      localStorage.setItem('role', 'rider')
      router.push('/home')
    } catch (err) {
      console.error('signup error', err)
      localStorage.setItem('role', 'rider')
      router.push('/home')
    }
  }

  return (
    <div className="min-h-screen pb-10 flex flex-col items-center justify-center" style={{ backgroundColor: '#1c2739' }}>
        <button onClick={() => router.back()} className="absolute top-4 left-4 flex items-center gap-2 hover:text-white transition-colors z-99" style={{ color: '#8d9baf' }}>
            <ArrowLeft size={15} />
            Back
        </button>
        
        <div className="max-w-md w-full px-6">
          <div className="flex items-center justify-center gap-2 mt-12 mb-12">
            <Lightning size={40} color="white" weight="bold" className="logo-bg p-2 rounded-xl" />
            <p className="text-2xl font-bold">Move</p>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => { setIsSignIn(true); setSignUpType(null); }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${isSignIn ? 'text-white font-bold' : 'font-semibold'}`}
              style={{ backgroundColor: isSignIn ? '#10b981' : 'transparent', color: isSignIn ? 'white' : '#8d9baf', border: isSignIn ? 'none' : '1px solid #323f4e' }}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${!isSignIn ? 'text-white font-bold' : 'font-semibold'}`}
              style={{ backgroundColor: !isSignIn ? '#10b981' : 'transparent', color: !isSignIn ? 'white' : '#8d9baf', border: !isSignIn ? 'none' : '1px solid #323f4e' }}
            >
              Sign Up
            </button>
          </div>

          {isSignIn && (
            <div className="rounded-2xl">
              <form className="space-y-6">
                <InputField id="signin-email" label="Email" type="email" placeholder="you@university.edu" value={sEmail} onChange={setSEmail} />
                <InputField id="signin-pass" label="Password" type="password" placeholder="........" value={sPass} onChange={setSPass} />

                <button type="button" className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all mt-8" style={{ backgroundColor: '#10b981' }} onClick={() => { /* implement sign-in using supabase.auth.signInWithPassword */ }}>Sign In</button>
              </form>
            </div>
          )}

          {!isSignIn && !signUpType && (
            <div className="space-y-4">
              <p className="text-center text-white font-semibold mb-6">Sign up as:</p>
              <button onClick={() => setSignUpType('student')} className="w-full py-4 px-4 rounded-lg text-white font-semibold transition-all border" style={{ backgroundColor: '#1a2332', borderColor: '#323f4e' }}>👨‍🎓 Student</button>
              <button onClick={() => setSignUpType('rider')} className="w-full py-4 px-4 rounded-lg text-white font-semibold transition-all border" style={{ backgroundColor: '#1a2332', borderColor: '#323f4e' }}>🚗 Rider</button>
            </div>
          )}

          {!isSignIn && signUpType === 'student' && (
            <div className="rounded-2xl">
              <button onClick={() => setSignUpType(null)} className="text-sm mb-4 transition-colors" style={{ color: '#8d9baf' }}>← Back</button>
              <form className="space-y-4" onSubmit={handleStudentSignup}>
                <InputField id="student-fname" label="First Name" placeholder="John" value={sFirst} onChange={setSFirst} />
                <InputField id="student-lname" label="Last Name" placeholder="Doe" value={sLast} onChange={setSLast} />
                <InputField id="student-email" label="Email" type="email" placeholder="you@university.edu" value={sEmail} onChange={setSEmail} />
                <InputField id="student-phone" label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" value={sPhone} onChange={setSPhone} />
                <InputField id="student-pass" label="Password" type="password" placeholder="........" value={sPass} onChange={setSPass} />

                <button type="submit" className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all mt-6" style={{ backgroundColor: '#10b981' }}>Create Account</button>
              </form>
            </div>
          )}

          {!isSignIn && signUpType === 'rider' && (
            <div className="rounded-2xl">
              <button onClick={() => setSignUpType(null)} className="text-sm mb-4 transition-colors" style={{ color: '#8d9baf' }}>← Back</button>
              <form className="space-y-4" onSubmit={handleRiderSignup}>
                <InputField id="rider-fname" label="First Name" placeholder="John" value={rFirst} onChange={setRFirst} />
                <InputField id="rider-lname" label="Last Name" placeholder="Doe" value={rLast} onChange={setRLast} />
                <InputField id="rider-email" label="Email" type="email" placeholder="you@university.edu" value={rEmail} onChange={setREmail} />
                <InputField id="rider-phone" label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" value={rPhone} onChange={setRPhone} />
                <InputField id="rider-vtype" label="Vehicle Type" placeholder="e.g., Sedan, SUV, Truck" value={rVType} onChange={setRVType} />
                <InputField id="rider-lplate" label="License Plate Number" placeholder="ABC-1234" value={rPlate} onChange={setRPlate} />
                <InputField id="rider-vest" label="Vest Number" placeholder="Enter your vest number" value={rVest} onChange={setRVest} />
                <InputField id="rider-pass" label="Password" type="password" placeholder="........" value={rPass} onChange={setRPass} />

                <button type="submit" className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all mt-6" style={{ backgroundColor: '#10b981' }}>Create Account</button>
              </form>
            </div>
          )}
        </div>
    </div>
  )
}

export default Page