import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/auth">Login</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/history">History</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  )
}
