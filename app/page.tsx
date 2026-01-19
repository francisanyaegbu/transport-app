'use client';
import Navbar from './components/Navbar';
import DashboardPage from './dashboard/page';

export default function Home() {
  return (
      <div>
        <Navbar />
        <DashboardPage />
      </div>
  );
}
