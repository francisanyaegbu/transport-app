'use client'
 
import { Lightning, ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SignUpType = 'student' | 'rider' | null;

const InputField = ({ 
  id, 
  label, 
  type = 'text', 
  placeholder 
}: { 
  id: string; 
  label: string; 
  type?: string; 
  placeholder: string 
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-semibold text-white">{label}</label>
    <input 
      type={type} 
      id={id}
      placeholder={placeholder} 
      className="w-full px-4 py-3 rounded-lg text-white border transition-colors placeholder-neutral-500 focus:outline-none"
      style={{ 
        backgroundColor: '#1a2332',
        borderColor: '#323f4e'
      }}
      onFocus={(e) => e.target.style.borderColor = '#10b981'}
      onBlur={(e) => e.target.style.borderColor = '#323f4e'}
    />
  </div>
);

export const Page = () => {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [signUpType, setSignUpType] = useState<SignUpType>(null);

  return (
    <div className="min-h-screen pb-10 flex flex-col items-center justify-center" style={{ backgroundColor: '#1c2739' }}>
        <button onClick={() => router.back()} className="absolute top-4 left-4 flex items-center gap-2 hover:text-white transition-colors z-99" style={{ color: '#8d9baf' }}>
            <ArrowLeft size={15} />
            Back
        </button>
        
        <div className="max-w-md w-full px-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mt-12 mb-12">
            <Lightning size={40} color="white" weight="bold" className="logo-bg p-2 rounded-xl" />
            <p className="text-2xl font-bold">Move</p>
          </div>
          
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => {
                setIsSignIn(true);
                setSignUpType(null);
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                isSignIn 
                  ? 'text-white font-bold' 
                  : 'font-semibold'
              }`}
              style={{
                backgroundColor: isSignIn ? '#10b981' : 'transparent',
                color: isSignIn ? 'white' : '#8d9baf',
                border: isSignIn ? 'none' : '1px solid #323f4e'
              }}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                !isSignIn 
                  ? 'text-white font-bold' 
                  : 'font-semibold'
              }`}
              style={{
                backgroundColor: !isSignIn ? '#10b981' : 'transparent',
                color: !isSignIn ? 'white' : '#8d9baf',
                border: !isSignIn ? 'none' : '1px solid #323f4e'
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Sign In Form */}
          {isSignIn && (
            <div className="rounded-2xl">
              <form className="space-y-6">
                <InputField 
                  id="signin-email" 
                  label="Email" 
                  type="email" 
                  placeholder="you@university.edu" 
                />
                <InputField 
                  id="signin-pass" 
                  label="Password" 
                  type="password" 
                  placeholder="........" 
                />

                <button 
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all mt-8"
                  style={{ backgroundColor: '#10b981' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2fd38c'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  Sign In
                </button>
              </form>
            </div>
          )}

          {/* Sign Up Type Selection */}
          {!isSignIn && !signUpType && (
            <div className="space-y-4">
              <p className="text-center text-white font-semibold mb-6">Sign up as:</p>
              <button 
                onClick={() => setSignUpType('student')}
                className="w-full py-4 px-4 rounded-lg text-white font-semibold transition-all border"
                style={{ 
                  backgroundColor: '#1a2332',
                  borderColor: '#323f4e'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#233445';
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a2332';
                  e.currentTarget.style.borderColor = '#323f4e';
                }}
              >
                👨‍🎓 Student
              </button>
              <button 
                onClick={() => setSignUpType('rider')}
                className="w-full py-4 px-4 rounded-lg text-white font-semibold transition-all border"
                style={{ 
                  backgroundColor: '#1a2332',
                  borderColor: '#323f4e'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#233445';
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a2332';
                  e.currentTarget.style.borderColor = '#323f4e';
                }}
              >
                🚗 Rider
              </button>
            </div>
          )}

          {/* Student Sign Up Form */}
          {!isSignIn && signUpType === 'student' && (
            <div className="rounded-2xl">
              <button 
                onClick={() => setSignUpType(null)}
                className="text-sm mb-4 transition-colors"
                style={{ color: '#8d9baf' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#8d9baf'}
              >
                ← Back
              </button>
              <form className="space-y-4">
                <InputField 
                  id="student-fname" 
                  label="First Name" 
                  placeholder="John" 
                />
                <InputField 
                  id="student-lname" 
                  label="Last Name" 
                  placeholder="Doe" 
                />
                <InputField 
                  id="student-email" 
                  label="Email" 
                  type="email" 
                  placeholder="you@university.edu" 
                />
                <InputField 
                  id="student-phone" 
                  label="Phone Number" 
                  type="tel" 
                  placeholder="+1 (555) 123-4567" 
                />
                <InputField 
                  id="student-pass" 
                  label="Password" 
                  type="password" 
                  placeholder="........" 
                />
                <InputField 
                  id="student-cpass" 
                  label="Confirm Password" 
                  type="password" 
                  placeholder="........" 
                />

                <button 
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all mt-6"
                  style={{ backgroundColor: '#10b981' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2fd38c'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  Create Account
                </button>
              </form>
            </div>
          )}

          {/* Rider Sign Up Form */}
          {!isSignIn && signUpType === 'rider' && (
            <div className="rounded-2xl">
              <button 
                onClick={() => setSignUpType(null)}
                className="text-sm mb-4 transition-colors"
                style={{ color: '#8d9baf' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#8d9baf'}
              >
                ← Back
              </button>
              <form className="space-y-4">
                <InputField 
                  id="rider-fname" 
                  label="First Name" 
                  placeholder="John" 
                />
                <InputField 
                  id="rider-lname" 
                  label="Last Name" 
                  placeholder="Doe" 
                />
                <InputField 
                  id="rider-email" 
                  label="Email" 
                  type="email" 
                  placeholder="you@university.edu" 
                />
                <InputField 
                  id="rider-phone" 
                  label="Phone Number" 
                  type="tel" 
                  placeholder="+1 (555) 123-4567" 
                />
                <InputField 
                  id="rider-vtype" 
                  label="Vehicle Type" 
                  placeholder="e.g., Sedan, SUV, Truck" 
                />
                <InputField 
                  id="rider-lplate" 
                  label="License Plate Number" 
                  placeholder="ABC-1234" 
                />
                <InputField 
                  id="rider-vest" 
                  label="Vest Number" 
                  placeholder="Enter your vest number" 
                />
                <InputField 
                  id="rider-pass" 
                  label="Password" 
                  type="password" 
                  placeholder="........" 
                />
                <InputField 
                  id="rider-cpass" 
                  label="Confirm Password" 
                  type="password" 
                  placeholder="........" 
                />

                <button 
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all mt-6"
                  style={{ backgroundColor: '#10b981' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2fd38c'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  Create Account
                </button>
              </form>
            </div>
          )}
        </div>
    </div>
  )
}

export default Page