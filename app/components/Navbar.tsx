'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { House, UserCircle, ClockCounterClockwise, Gear, BellSimple } from '@phosphor-icons/react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (p: string) => pathname === p

 const { displayName, avatarUrl } = useMemo(() => {
   try {
     const sessionId = localStorage.getItem('mock_session')
     if (sessionId) {
       const raw = localStorage.getItem('mock_users')
       const users = raw ? JSON.parse(raw) : []
       const me = users.find((u: unknown) => (u as { id: string }).id === sessionId)
       if (me) {
         const user = me as { name?: string; email?: string; avatar_url?: string }
         const name = user.name || (user.email || '').split('@')[0] || 'User'
         return {
           displayName: name,
           avatarUrl: user.avatar_url || '',
         }
       }
     }
   } catch (e) {
     console.error(e)
   }
   return { displayName: 'User', avatarUrl: '' }
 }, [])

 function getGreeting() {
   const h = new Date().getHours()
   if (h >= 6 && h < 12) return 'Good morning'
   if (h >= 12 && h < 17) return 'Good afternoon'
   if (h >= 17 && h < 21) return 'Good evening'
   return 'Good night'
 }

 function letterAvatarDataUrl(name: string) {
   const letter = (name?.trim()?.[0] || 'U').toUpperCase()
   const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='#E5E7EB'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica, Arial, sans-serif' font-size='96' fill='#111827'>${letter}</text></svg>`
   return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
 }

  return (
    <>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottom: '1px solid #eee', position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: 'white', zIndex: 999 }}>
        {/* Desktop left - title */}
        <div className="desktop-left hidden lg:block" style={{ fontSize: 24, fontWeight: 'bold' }}>Move</div>

        {/* Mobile left - greeting */}
        <div className="mobile-left text-md font-semibold flex items-center gap-3">
          <Link href="/profile" style={{ display: 'inline-block' }}>
            <div
              aria-hidden
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${avatarUrl || letterAvatarDataUrl(displayName)})`,
                border: '1px solid #eee',
              }}
            />
          </Link>
          {getGreeting() + ', ' + displayName.slice(0, 8) + '...'}
        </div>

        {/* Desktop menu button */}
        <button
          className="desktop-menu hidden lg:block"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            padding: 8,
          }}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Mobile right - notifications + avatar */}
        <div className="mobile-right flex items-center">
          <Link href="/notifications" className='border p-1.5 rounded-full border-gray-300'>
            <BellSimple size={20} />
          </Link>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
           style={{
             position: 'fixed',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             backgroundColor: 'rgba(0, 0, 0, 0.5)',
             zIndex: 998,
           }}
         />
       )}
 
       {/* Slide-in Menu */}
       <div
         style={{
           position: 'fixed',
           top: 0,
           right: 0,
           height: '100vh',
           width: 250,
           backgroundColor: 'white',
           boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.15)',
           transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
           transition: 'transform 0.3s ease-in-out',
           zIndex: 999,
           padding: 20,
           paddingTop: 40,
         }}
       >
         <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
           <Link href="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontSize: 16 }}>
             Dashboard
           </Link>
           <Link href="/auth" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontSize: 16 }}>
             Login
           </Link>
           <Link href="/profile" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontSize: 16 }}>
             Profile
           </Link>
           <Link href="/history" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontSize: 16 }}>
             History
           </Link>
           <Link href="/settings" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontSize: 16 }}>
             Settings
           </Link>
         </div>
       </div>
 
       {/* Bottom Navigation - Mobile Only */}
       <nav
         style={{
           position: 'fixed',
           bottom: 0,
           left: 0,
           right: 0,
           height: 60,
           backgroundColor: 'white',
           borderTop: '1px solid #eee',
           zIndex: 100,
         }}
         className="mobile-bottom-nav"
       >
         <div className='flex flex-row items-center justify-between w-full px-6 h-full'>
           <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
             <House size={20} color={isActive('/') ? '#2563EB' : 'gray'} />
             <span style={{ fontSize: 10, color: isActive('/') ? '#2563EB' : 'inherit' }}>Dashboard</span>
           </Link>
           <Link href="/history" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
             <ClockCounterClockwise size={20} color={isActive('/history') ? '#2563EB' : 'gray'} />
             <span style={{ fontSize: 10, color: isActive('/history') ? '#2563EB' : 'inherit' }}>History</span>
           </Link>
           <Link href="/profile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
             <UserCircle size={20} color={isActive('/profile') ? '#2563EB' : 'gray'} />
             <span style={{ fontSize: 10, color: isActive('/profile') ? '#2563EB' : 'inherit' }}>Profile</span>
           </Link>
           <Link href="/settings" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
             <Gear size={20} color={isActive('/settings') ? '#2563EB' : 'gray'} />
             <span style={{ fontSize: 10, color: isActive('/settings') ? '#2563EB' : 'inherit' }}>Settings</span>
           </Link>
         </div>
       </nav>
 
       <style>{`
-        .mobile-bottom-nav {
-          display: none;
-        }
-        @media (max-width: 768px) {
-          .mobile-bottom-nav {
-            display: flex;
-          }
-          body {
-            padding-bottom: 70px;
-          }
-        }
+        .mobile-bottom-nav { display: none; }
+        .mobile-left, .mobile-right { display: none; }
+        .desktop-left, .desktop-menu { display: block; }
+        @media (max-width: 768px) {
+          .mobile-bottom-nav { display: flex; }
+          .mobile-left { display: block; }
+          .mobile-right { display: flex; align-items: center; gap: 12px; }
+          .desktop-left, .desktop-menu { display: none; }
+          body { padding-bottom: 70px; }
+        }
       `}</style>
     </>
   )
 }