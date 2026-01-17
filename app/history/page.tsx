import Navbar from '../../app/components/Navbar'

export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 18 }}>
        <h1>Ride History</h1>
        <p>List of completed and past rides.</p>
        <ul>
          <li>Ride — 2026-01-01 — $4.20</li>
          <li>Ride — 2026-01-05 — $3.75</li>
        </ul>
      </main>
    </>
  )
}
