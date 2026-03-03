'use client'

import { usePathname } from 'next/navigation'
import BottomNav from './BottomNav'

export default function NavWrapper({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  
  // hide nav on auth pages
  if (path?.startsWith('/auth')) {
    return <>{children}</>
  }
  
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}
