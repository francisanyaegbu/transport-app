'use client'
 
import { Lightning, ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import supabase from '../../../lib/supabaseClient'  // ensure correct relative path


type SignUpType = 'student' | 'rider' | null;

const InputField = ({ 
  id, 
  name, 
  label, 
  type = 'text', 
  placeholder 
}: { 
  id: string; 
  name?: string;
  label: string; 
  type?: string; 
  placeholder: string 
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-semibold text-white">{label}</label>
    <input 
      type={type} 
      id={id}
      name={name}
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // if user is already signed in, send to dashboard
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.push('/')
      }
    })
  }, [router]);

  // helper to persist role after login
  const storeRole = async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (profile && profile.role) localStorage.setItem('role', profile.role);
      }
    } catch (err) {
      console.debug('store role', err);
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('signin-email') as string;
    const password = formData.get('signin-pass') as string;
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await storeRole();
      router.push('/');
    } catch (err: unknown) {
      console.debug('signin', err);
      const msg = (err as { message?: string }).message;
      setErrorMsg(msg || 'Unable to sign in');
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!signUpType) return;
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get(`${signUpType}-email`) as string;
    const password = formData.get(`${signUpType}-pass`) as string;
    const confirm = formData.get(`${signUpType}-cpass`) as string;
    if (password !== confirm) {
      setErrorMsg('Passwords do not match');
      return;
    }
    const first_name = formData.get(`${signUpType}-fname`) as string;
    const last_name = formData.get(`${signUpType}-lname`) as string;
    const phone = formData.get(`${signUpType}-phone`) as string;
    const extra: Record<string, unknown> = {};
    if (signUpType === 'rider') {
      extra.vehicle_type = formData.get('rider-vtype') as string;
      extra.license_plate = formData.get('rider-lplate') as string;
      extra.vest_number = formData.get('rider-vest') as string;
    }
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles').insert({
          id: user.id,
          first_name,
          last_name,
          phone,
          role: signUpType,
          ...extra
        });
        localStorage.setItem('role', signUpType);
        router.push('/');
      }
    } catch (err: unknown) {
      console.debug('signup', err);
      const msg = (err as { message?: string }).message;
      setErrorMsg(msg || 'Unable to create account');
    }
  };

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
            {errorMsg && <p className="text-red-400 text-center w-full mb-2">{errorMsg}</p>}
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
              <form className="space-y-6" onSubmit={handleSignIn}>
                <InputField 
                  id="signin-email" 
                  name="signin-email"
                  label="Email" 
                  type="email" 
                  placeholder="you@university.edu" 
                />
                <InputField 
                  id="signin-pass" 
                  name="signin-pass"
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
              <form className="space-y-4" onSubmit={handleSignUp}>
                <InputField 
                  id="student-fname" 
                  name="student-fname"
                  label="First Name" 
                  placeholder="John" 
                />
                <InputField 
                  id="student-lname" 
                  name="student-lname"
                  label="Last Name" 
                  placeholder="Doe" 
                />
                <InputField 
                  id="student-email" 
                  name="student-email"
                  label="Email" 
                  type="email" 
                  placeholder="you@university.edu" 
                />
                <InputField 
                  id="student-phone" 
                  name="student-phone"
                  label="Phone Number" 
                  type="tel" 
                  placeholder="+1 (555) 123-4567" 
                />
                <InputField 
                  id="student-pass" 
                  name="student-pass"
                  label="Password" 
                  type="password" 
                  placeholder="........" 
                />
                <InputField 
                  id="student-cpass" 
                  name="student-cpass"
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
              <form className="space-y-4" onSubmit={handleSignUp}>
                <InputField 
                  id="rider-fname" 
                  name="rider-fname"
                  label="First Name" 
                  placeholder="John" 
                />
                <InputField 
                  id="rider-lname" 
                  name="rider-lname"
                  label="Last Name" 
                  placeholder="Doe" 
                />
                <InputField 
                  id="rider-email" 
                  name="rider-email"
                  label="Email" 
                  type="email" 
                  placeholder="you@university.edu" 
                />
                <InputField 
                  id="rider-phone" 
                  name="rider-phone"
                  label="Phone Number" 
                  type="tel" 
                  placeholder="+1 (555) 123-4567" 
                />
                <InputField 
                  id="rider-vtype" 
                  name="rider-vtype"
                  label="Vehicle Type" 
                  placeholder="e.g., Sedan, SUV, Truck" 
                />
                <InputField 
                  id="rider-lplate" 
                  name="rider-lplate"
                  label="License Plate Number" 
                  placeholder="ABC-1234" 
                />
                <InputField 
                  id="rider-vest" 
                  name="rider-vest"
                  label="Vest Number" 
                  placeholder="Enter your vest number" 
                />
                <InputField 
                  id="rider-pass" 
                  name="rider-pass"
                  label="Password" 
                  type="password" 
                  placeholder="........" 
                />
                <InputField 
                  id="rider-cpass" 
                  name="rider-cpass"
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