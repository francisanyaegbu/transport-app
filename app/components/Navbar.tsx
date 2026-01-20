'use client'

import Link from 'next/link'
import { useState } from 'react'
import { House, UserCircle, ClockCounterClockwise, Gear } from '@phosphor-icons/react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid #eee' }}>
        <div style={{ fontSize: 20, fontWeight: 'bold' }}>CampusRide</div>
        <button
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
          height: 70,
          backgroundColor: 'white',
          borderTop: '1px solid #eee',
          zIndex: 100,
        }}
        className="mobile-bottom-nav"
      >
        <div className='flex flex-row items-center justify-between w-full px-6'>
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none', color: 'inherit' }}>
            <House size={28} />
            <span style={{ fontSize: 12 }}></span>
          </Link>
          <Link href="/history" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none', color: 'inherit' }}>
            <ClockCounterClockwise size={28} />
            <span style={{ fontSize: 12 }}></span>
          </Link>
          <Link href="/profile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none', color: 'inherit' }}>
            <UserCircle size={28} />
            <span style={{ fontSize: 12 }}></span>
          </Link>
          <Link href="/settings" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none', color: 'inherit' }}>
            <Gear size={28} />
            <span style={{ fontSize: 12 }}></span>
          </Link>
        </div>
      </nav>

      <style>{`
        .mobile-bottom-nav {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex;
          }
          body {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </>
  )
}
