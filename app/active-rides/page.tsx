'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ActiveRides() {
  const [rides, setRides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRide, setSelectedRide] = useState<any>(null)

  useEffect(() => {
    fetchRides()
    const interval = setInterval(fetchRides, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchRides = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/rides/active', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setRides(data.rides)
      }
    } catch (error) {
      console.error('Error fetching rides:', error)
    } finally {
      setLoading(false)
    }
  }

  const triggerSOS = async (rideId: string) => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`/api/rides/${rideId}/sos`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('🚨 Emergency contacts notified!')
    } catch (error) {
      console.error('Error triggering SOS:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
            🚗 RideShare
          </Link>
          <div className="flex gap-4">
            <Link href="/book-ride" className="text-blue-600 hover:underline font-semibold">
              Book Ride
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
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">🚦 Your Rides</h1>

        {loading ? (
          <div className="text-center py-8">
            <div className="spinner mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading rides...</p>
          </div>
        ) : rides.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No active rides</p>
            <Link href="/book-ride" className="text-blue-600 hover:underline font-semibold">
              📍 Book a ride now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rides List */}
            <div className="lg:col-span-1 space-y-4">
              {rides.map((ride) => (
                <div
                  key={ride._id}
                  onClick={() => setSelectedRide(ride)}
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    selectedRide?._id === ride._id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-white border border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{ride.pickupLocation?.address}</div>
                      <div className="text-sm text-gray-600">
                        → {ride.dropoffLocation?.address}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">Rs.{ride.finalFare || ride.estimatedFare}</div>
                      <div className={`text-xs font-semibold ${
                        ride.status === 'in_progress'
                          ? 'text-green-600'
                          : ride.status === 'accepted'
                          ? 'text-blue-600'
                          : 'text-orange-600'
                      }`}>
                        {ride.status.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Driver Info */}
                  {ride.driverId && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                      <div className="font-semibold">👤 Driver: {ride.driverId?.name}</div>
                      <div className="text-gray-600">⭐ Rating: {ride.driverId?.rating || 5}</div>
                    </div>
                  )}

                  <div className="mt-2 text-xs text-gray-500">
                    {ride.distance?.toFixed(1)}km | {ride.duration}min
                  </div>
                </div>
              ))}
            </div>

            {/* Ride Details & Map */}
            {selectedRide && (
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {/* Map Placeholder */}
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🗺️</div>
                      <p className="text-gray-600">Live Map Integration Coming Soon</p>
                      <p className="text-sm text-gray-500">Pickup: {selectedRide.pickupLocation?.address}</p>
                      <p className="text-sm text-gray-500">Dropoff: {selectedRide.dropoffLocation?.address}</p>
                    </div>
                  </div>

                  {/* Ride Status */}
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3">📍 Ride Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Status</span>
                        <span className="font-semibold uppercase">{selectedRide.status}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Distance</span>
                        <span className="font-semibold">{selectedRide.distance?.toFixed(1)}km</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Duration</span>
                        <span className="font-semibold">{selectedRide.duration}min</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                        <span>Fare</span>
                        <span className="font-bold text-lg">Rs.{selectedRide.finalFare || selectedRide.estimatedFare}</span>
                      </div>
                    </div>
                  </div>

                  {/* Driver Details */}
                  {selectedRide.driverId && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-bold mb-3">👤 Driver Details</h3>
                      <div className="space-y-2">
                        <div>Name: {selectedRide.driverId?.name}</div>
                        <div>Phone: {selectedRide.driverId?.phone}</div>
                        <div>Vehicle: {selectedRide.vehicleModel || 'Not specified'}</div>
                        <div>Rating: ⭐ {selectedRide.driverId?.rating}</div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {selectedRide.status === 'in_progress' && (
                      <>
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold">
                          💬 Chat with Driver
                        </button>
                        <button
                          onClick={() => triggerSOS(selectedRide._id)}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold"
                        >
                          🚨 SOS
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
