'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DriverHomeMobile() {
  const [tab, setTab] = useState<'available' | 'active' | 'earnings'>('available')
  const [isOnline, setIsOnline] = useState(false)
  const [submittingOffer, setSubmittingOffer] = useState<string | null>(null)

  const mockAvailableRides = [
    {
      id: '1',
      pickup: 'Sector 11, Noida',
      dropoff: 'Connaught Place, Delhi',
      distance: 25,
      fare: 450,
      rider: 'Aisha Khan',
      rating: 4.8,
    },
    {
      id: '2',
      pickup: 'Gurugram Cyber Park',
      dropoff: 'Delhi Airport',
      distance: 35,
      fare: 650,
      rider: 'Vikram Singh',
      rating: 4.9,
    },
  ]

  const mockActiveRides = [
    {
      id: '3',
      pickup: 'Indirapuram',
      dropoff: 'Dwarka',
      status: 'in-progress',
      passenger: 'Neha Gupta',
      fare: 380,
    },
  ]

  const handleSubmitOffer = (rideId: string) => {
    setSubmittingOffer(rideId)
    setTimeout(() => {
      setSubmittingOffer(null)
      alert('✅ Offer submitted! Waiting for acceptance...')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white font-black text-2xl">🚗 Driver</h1>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-6 py-2 rounded-full font-bold transition text-sm ${
              isOnline
                ? 'bg-green-500 text-white'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {isOnline ? '🟢 Online' : '⚪ Offline'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-800 rounded-xl p-3">
            <div className="text-xs text-slate-400">Today</div>
            <div className="text-xl font-black text-green-400">₹2,450</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-3">
            <div className="text-xs text-slate-400">Rides</div>
            <div className="text-xl font-black text-emerald-400">8</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-3">
            <div className="text-xs text-slate-400">Rating</div>
            <div className="text-xl font-black text-yellow-400">4.9★</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <button
          onClick={() => setTab('available')}
          className={`flex-1 py-4 font-bold text-sm transition border-b-2 ${
            tab === 'available'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400'
          }`}
        >
          📍 Available
        </button>
        <button
          onClick={() => setTab('active')}
          className={`flex-1 py-4 font-bold text-sm transition border-b-2 ${
            tab === 'active'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400'
          }`}
        >
          🚗 Active
        </button>
        <button
          onClick={() => setTab('earnings')}
          className={`flex-1 py-4 font-bold text-sm transition border-b-2 ${
            tab === 'earnings'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400'
          }`}
        >
          💰 Earnings
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {tab === 'available' && (
          <>
            {mockAvailableRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700"
              >
                {/* Route */}
                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    <div className="text-xl">📍</div>
                    <div className="flex-1">
                      <div className="text-white font-bold">{ride.pickup}</div>
                      <div className="text-slate-400 text-sm mt-1">↓</div>
                      <div className="text-slate-300 font-semibold mt-1">{ride.dropoff}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-green-400">₹{ride.fare}</div>
                      <div className="text-xs text-slate-400">{ride.distance}km</div>
                    </div>
                  </div>
                </div>

                {/* Rider Info */}
                <div className="bg-slate-700/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">👤</div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{ride.rider}</div>
                      <div className="text-yellow-400 text-xs">⭐ {ride.rating}</div>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => handleSubmitOffer(ride.id)}
                  disabled={submittingOffer === ride.id || !isOnline}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 transition text-sm"
                >
                  {submittingOffer === ride.id ? '⏳ Submitting...' : '💰 Submit Offer'}
                </button>
              </div>
            ))}
          </>
        )}

        {tab === 'active' && (
          <>
            {mockActiveRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-green-500/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white font-bold">{ride.pickup}</div>
                    <div className="text-slate-300 text-sm">→ {ride.dropoff}</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                    🟢 In Progress
                  </span>
                </div>

                <div className="bg-slate-700/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">👤</div>
                      <div>
                        <div className="text-white font-bold text-sm">{ride.passenger}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-green-400">₹{ride.fare}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 text-sm font-bold transition">
                    📱 Chat
                  </button>
                  <button className="py-2 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 text-sm font-bold transition">
                    🗺️ Navigate
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'earnings' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/30">
              <div className="text-slate-400 text-sm mb-2">Total Earnings</div>
              <div className="text-4xl font-black text-green-400 mb-4">₹12,450</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-slate-400 text-xs">This Week</div>
                  <div className="text-lg font-bold text-white">₹2,100</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs">Rides Completed</div>
                  <div className="text-lg font-bold text-white">28</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
              <div className="font-bold text-white mb-3">Recent Rides</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Noida → CP (24 km)</span>
                  <span className="text-green-400 font-bold">₹420</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Gurugram → Airport (32 km)</span>
                  <span className="text-green-400 font-bold">₹640</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Dwarka → Gurgaon (28 km)</span>
                  <span className="text-green-400 font-bold">₹520</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-700 bg-slate-900/95 backdrop-blur-md px-4 py-4 flex justify-around">
        <Link href="/" className="text-center text-slate-400 hover:text-white transition">
          <div className="text-2xl mb-1">🏠</div>
          <div className="text-xs">Home</div>
        </Link>
        <button className="text-center text-emerald-400">
          <div className="text-2xl mb-1">🚗</div>
          <div className="text-xs">Drive</div>
        </button>
        <Link href="/dashboard" className="text-center text-slate-400 hover:text-white transition">
          <div className="text-2xl mb-1">📋</div>
          <div className="text-xs">History</div>
        </Link>
        <Link href="/" className="text-center text-slate-400 hover:text-white transition">
          <div className="text-2xl mb-1">👤</div>
          <div className="text-xs">Profile</div>
        </Link>
      </div>
    </div>
  )
}
