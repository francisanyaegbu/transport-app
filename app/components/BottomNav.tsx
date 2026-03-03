"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, Gear, User, Clock } from "@phosphor-icons/react"

const items = [
  { href: '/home', label: 'Home', icon: <House size={24} /> },
  { href: '/history', label: 'History', icon: <Clock size={24} /> },
  { href: '/profile', label: 'Profile', icon: <User size={24} /> },
  { href: '/settings', label: 'Settings', icon: <Gear size={24} /> },
]

export default function BottomNav() {
  const path = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#162033] border-t border-[#334155] z-50">
      <ul className="flex justify-around py-2">
        {items.map(item => {
          const active = path === item.href
          return (
            <li key={item.href} className="flex-1 text-center">
              <Link href={item.href} className={`flex flex-col items-center justify-center ${active ? 'text-[#10b981]' : 'text-[#8d9baf]'} btn`}>
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
