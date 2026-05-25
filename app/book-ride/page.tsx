'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BookRide() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [vehicleType, setVehicleType] = useState('economy')
  const [riderFare, setRiderFare] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/rides/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          vehicleType,
          riderOfferedFare: parseFloat(riderFare),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create ride')
      }

      window.location.href = '/active-rides'
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
            🚗 RideShare
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              window.location.href = '/'
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">📍 Book Your Ride</h1>
          <p className="text-gray-600 mb-6">Enter your pickup and dropoff locations</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pickup Location */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                📍 Pickup Location
              </label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dropoff Location */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                🏁 Dropoff Location
              </label>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Enter dropoff location"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                🚙 Vehicle Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'economy', name: 'Economy', price: '₹50/km' },
                  { id: 'comfort', name: 'Comfort', price: '₹70/km' },
                  { id: 'premium', name: 'Premium', price: '₹100/km' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setVehicleType(type.id)}
                    className={`p-4 rounded-lg border-2 transition ${
                      vehicleType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <div className="font-semibold">{type.name}</div>
                    <div className="text-sm text-gray-600">{type.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Rider's Fare Offer (InDrive Style) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                💰 Your Fare Offer
              </label>
              <div className="flex items-center">
                <span className="text-xl mr-3">₹</span>
                <input
                  type="number"
                  value={riderFare}
                  onChange={(e) => setRiderFare(e.target.value)}
                  placeholder="Enter your offer"
                  min="0"
                  step="10"
                  required
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Drivers will accept or reject your offer
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? 'Searching for drivers...' : '🔍 Find a Driver'}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">💡 How it works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✅ Enter pickup and dropoff location</li>
              <li>✅ Set your own price (Like InDrive!)</li>
              <li>✅ Drivers see your request</li>
              <li>✅ Drivers accept or negotiate</li>
              <li>✅ Ride begins when driver accepts</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
