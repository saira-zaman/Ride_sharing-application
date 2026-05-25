'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface RideRequest {
  _id: string
  riderId: any
  pickupLocation: any
  dropoffLocation: any
  estimatedFare: number
  distance: number
  duration: number
  vehicleType: string
  createdAt: string
}

export default function DriverHome() {
  const [availableRides, setAvailableRides] = useState<RideRequest[]>([])
  const [acceptedRides, setAcceptedRides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(false)
  const [driverId, setDriverId] = useState('')
  const [submittingOffer, setSubmittingOffer] = useState<string | null>(null)
  const [tab, setTab] = useState<'available' | 'accepted'>('available')

  useEffect(() => {
    const id = localStorage.getItem('driverId') || localStorage.getItem('userId')
    if (id) {
      setDriverId(id)
      fetchAvailableRides(id)
      fetchAcceptedRides(id)
    }
    const interval = setInterval(() => {
      if (id) {
        fetchAvailableRides(id)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchAvailableRides = async (driverId: string) => {
    try {
      const response = await fetch(`/api/rides/available?driverId=${driverId}`)
      if (response.ok) {
        const data = await response.json()
        setAvailableRides(data.rides || [])
      }
    } catch (error) {
      console.error('Error fetching available rides:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAcceptedRides = async (driverId: string) => {
    try {
      const response = await fetch(`/api/rides?driverId=${driverId}`)
      if (response.ok) {
        const data = await response.json()
        setAcceptedRides(data.rides?.filter((r: any) => r.driverId) || [])
      }
    } catch (error) {
      console.error('Error fetching accepted rides:', error)
    }
  }

  const submitOffer = async (rideId: string, estimatedFare: number) => {
    setSubmittingOffer(rideId)
    try {
      // Calculate a competitive offer (slightly below estimated fare)
      const offeredFare = Math.floor(estimatedFare * 0.9)

      const response = await fetch(`/api/rides/${rideId}/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driverId,
          offeredFare,
          vehicleType: 'economy',
          vehicleNumber: 'DL-01-AB-1234',
          driverRating: 4.8,
          eta: 5,
        }),
      })

      if (response.ok) {
        alert('✅ Offer submitted successfully!')
        setAvailableRides(availableRides.filter((r) => r._id !== rideId))
      } else {
        alert('❌ Failed to submit offer')
      }
    } catch (error) {
      console.error('Error submitting offer:', error)
      alert('Error submitting offer')
    } finally {
      setSubmittingOffer(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">🚗 Driver Dashboard</h1>
          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = '/login'
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTab('available')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === 'available'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📋 Available Rides ({availableRides.length})
          </button>
          <button
            onClick={() => setTab('accepted')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === 'accepted'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ✅ Accepted Rides ({acceptedRides.length})
          </button>
        </div>

        {/* Available Rides */}
        {tab === 'available' && (
          <div>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading available rides...</p>
              </div>
            ) : availableRides.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600 text-lg">No available rides at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableRides.map((ride) => (
                  <div
                    key={ride._id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition border-l-4 border-indigo-600"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="font-bold text-lg text-gray-800 mb-1">
                          📍 {ride.pickupLocation?.address}
                        </div>
                        <div className="text-gray-600 text-sm mb-3">
                          → {ride.dropoffLocation?.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600">
                          ₹{ride.estimatedFare}
                        </div>
                        <div className="text-xs text-gray-500">Estimated Fare</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Distance:</span>
                        <span className="font-semibold">{ride.distance?.toFixed(1)} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Duration:</span>
                        <span className="font-semibold">{ride.duration} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Vehicle Type:</span>
                        <span className="font-semibold capitalize">{ride.vehicleType}</span>
                      </div>
                    </div>

                    {/* Rider Info */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Rider:</p>
                      <p className="text-gray-800">👤 {ride.riderId?.name}</p>
                      <p className="text-gray-600 text-sm">⭐ {ride.riderId?.rating || 5.0}/5.0</p>
                    </div>

                    <button
                      onClick={() => submitOffer(ride._id, ride.estimatedFare)}
                      disabled={submittingOffer === ride._id}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-500 transition"
                    >
                      {submittingOffer === ride._id ? '⏳ Submitting...' : '💰 Submit Offer'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Accepted Rides */}
        {tab === 'accepted' && (
          <div>
            {acceptedRides.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600 text-lg">No accepted rides yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {acceptedRides.map((ride) => (
                  <div key={ride._id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold text-lg text-gray-800 mb-1">
                          📍 {ride.pickupLocation?.address}
                        </div>
                        <div className="text-gray-600 text-sm">
                          → {ride.dropoffLocation?.address}
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {ride.status}
                      </span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="flex justify-between">
                        <span>Final Fare:</span>
                        <span className="font-bold text-green-600">₹{ride.finalFare}</span>
                      </div>
                    </div>

                    <Link
                      href={`/ride/${ride._id}`}
                      className="w-full block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
