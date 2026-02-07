'use client';

import { Lightning, MapPin, Clock, SealCheck } from "@phosphor-icons/react";
import Link from "next/link";

export default function Home() {
  // Sample data - replace with actual data fetching
  const numRiders = 1250; // Number of registered riders
  const avgWaitTime = 2; // Approximated time for successful ping in minutes
  const rating = 4.8; // Average rating from users

  // Format riders count
  const formatRiders = (num: number): string => {
    if (num < 1000) return num.toString();
    const k = Math.floor(num / 1000);
    return `${k}k+`;
  };

  return (
      <div className='h-screen px-6 py-4'>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightning size={40} color="white" weight="bold" className="logo-bg p-2 rounded-xl" />
            <p className="text-2xl font-bold">Move</p>
          </div>
          <Link href='/login' className="signin">Sign In</Link>
        </div>
        <div className="flex flex-col items-center justify-center mt-15">
          <p className="avail w-fit rounded-2xl px-4 py-1.5">Now available on campus</p>
          <span className="text-4xl font-bold mt-4">Your Move,</span>
          <span className="text-4xl yourride font-bold">your ride</span>
          <p className="text-lg connect text-center mt-4 mb-7 font-medium">Connect with nearby riders instantly. Safe, fast, and made for campus life.</p>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <button className="text-lg text-white getstarted p-3 font-semibold rounded-2xl cursor-pointer">
              Get Started
            </button>
            <button className="learnmore text-lg text-white p-3 font-semibold rounded-2xl cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-10 pb-10">
          <div>
            <p className="text-center text-nowrap font-semibold text-2xl">{formatRiders(numRiders)}</p>
            <p className="text-sm text-neutral-400 text-center">Active Riders</p>
          </div>
          <div>
            <p className="text-center text-nowrap font-semibold text-2xl">{avgWaitTime} min</p>
            <p className="text-sm text-neutral-400 text-center">Avg. Wait Time</p>
          </div>
          <div>
            <p className="text-center text-nowrap font-semibold text-2xl">{rating}</p>
            <p className="text-sm text-neutral-400 text-center">Our Rating</p>
          </div>
        </div>
        
        <div>
          <h1 className="text-center text-2xl h-fit font-semibold pt-10 howitworks">How it works</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 pb-10">
            <div className="how border p-6 rounded-xl">
              <MapPin size={45} className="icon"/>
              <p className="text-xl font-medium mb-2 text-nowrap">Find Nearby Searches</p>
              <p className="desc">See all available riders near you in real-time on campus.</p>
            </div>
            <div className="how border p-6 rounded-xl">
              <Clock size={45} className="icon"/>
              <p className="text-xl font-medium mb-2 text-nowrap">Quick Request</p>
              <p className="desc">Request a ride in seconds with just your pickup and destination.</p>
            </div>
            <div className="how border p-6 rounded-xl">
              <SealCheck size={45} className="icon" />
              <p className="text-xl font-medium mb-2 text-nowrap">Safe & Verified</p>
              <p className="desc">All riders are verified students. Ride with confidence.</p>
            </div>
          </div>
        </div>
      </div>
  );
}
