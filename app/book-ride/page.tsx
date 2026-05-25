'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BookRide() {
  const [pickup, setPickup] = useState('📍 Current Location')
  const [dropoff, setDropoff] = useState('')
  const [vehicleType, setVehicleType] = useState('economy')
  const [riderFare, setRiderFare] = useState('250')
  const [showOffers, setShowOffers] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)

  const mockOffers = [
    { driverId: '1', name: 'Rajesh', rating: 4.9, fare: 240, eta: 3, vehicle: 'Creta', plate: 'DL-01-AB-1234', img: '👨' },
    { driverId: '2', name: 'Priya', rating: 4.8, fare: 250, eta: 5, vehicle: 'XUV500', plate: 'DL-01-CD-5678', img: '👩' },
    { driverId: '3', name: 'Amit', rating: 4.7, fare: 235, eta: 4, vehicle: 'Nexon', plate: 'DL-01-EF-9012', img: '👨' },
    { driverId: '4', name: 'Sneha', rating: 4.9, fare: 255, eta: 6, vehicle: 'Swift', plate: 'DL-01-GH-3456', img: '👩' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (dropoff.trim()) {
      setShowOffers(true)
    }
  }

  const handleSelectOffer = (offerId: string) => {
    setSelectedOffer(offerId)
    const offer = mockOffers.find(o => o.driverId === offerId)
    if (offer) {
      setShowConfirmation(true)
    }
  }

  const selectedDriverData = selectedOffer ? mockOffers.find(o => o.driverId === selectedOffer) : null

  if (showConfirmation && selectedDriverData) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
        <div className="w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-3xl p-4 sm:p-6 space-y-6 max-h-[90vh] overflow-y-auto modal-slide-up">
          {/* Close Button */}
          <button
            onClick={() => {
              setShowConfirmation(false)
              setSelectedOffer(null)
              setShowOffers(false)
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-2xl text-slate-300 hover:text-white transition"
          >
            ✕
          </button>

          {/* Title */}
          <div className="text-center pt-4">
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Ride Details</h1>
            <p className="text-slate-400 text-sm">Confirm your booking</p>
          </div>

          {/* Route Summary */}
          <div className="bg-slate-700/50 rounded-2xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📍</div>
              <div className="flex-1">
                <p className="text-slate-400 text-xs">From</p>
                <p className="text-white font-bold">{pickup}</p>
              </div>
            </div>
            <div className="border-l-2 border-slate-600 ml-4 h-6"></div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🏁</div>
              <div className="flex-1">
                <p className="text-slate-400 text-xs">To</p>
                <p className="text-white font-bold">{dropoff}</p>
              </div>
            </div>
          </div>

          {/* Driver Card */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="text-6xl">{selectedDriverData.img}</div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white">{selectedDriverData.name}</h3>
                <p className="text-yellow-400 font-bold mb-2">⭐ {selectedDriverData.rating} • {selectedDriverData.vehicle}</p>
                <p className="text-slate-400 text-sm">License: {selectedDriverData.plate}</p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 bg-slate-700/30 rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Base Fare</span>
              <span className="text-white font-bold">₹ 50</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Distance (5 km)</span>
              <span className="text-white font-bold">₹ 150</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Surge Price</span>
              <span className="text-white font-bold">₹ 40</span>
            </div>
            <div className="border-t border-slate-600 pt-3 flex justify-between items-center">
              <span className="text-white font-bold text-lg">Driver's Offer</span>
              <span className="text-4xl font-black text-green-400">₹ {selectedDriverData.fare}</span>
            </div>
          </div>

          {/* Savings Badge */}
          <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-4 text-center">
            <p className="text-green-400 font-bold text-lg">💰 You Save ₹ 10</p>
            <p className="text-green-300 text-xs mt-1">Driver's offer is below estimated fare!</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-700 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">⏱️</p>
              <p className="text-white font-bold text-sm">ETA {selectedDriverData.eta} min</p>
              <p className="text-slate-400 text-xs">Arrival time</p>
            </div>
            <div className="bg-slate-700 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">🗺️</p>
              <p className="text-white font-bold text-sm">5 km away</p>
              <p className="text-slate-400 text-xs">Distance</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => {
                setShowConfirmation(false)
                alert(`✅ Ride confirmed with ${selectedDriverData.name}!`)
              }}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg rounded-2xl hover:shadow-2xl hover:shadow-green-500/50 transition transform active:scale-95"
            >
              💳 Confirm Booking
            </button>
            <button
              onClick={() => {
                setShowConfirmation(false)
                setSelectedOffer(null)
              }}
              className="w-full py-4 bg-slate-700 text-slate-300 font-bold text-lg rounded-2xl hover:bg-slate-600 transition"
            >
              Back to Drivers
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showOffers) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
        {/* Header */}
        <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setShowOffers(false)}
            className="text-2xl"
          >
            ←
          </button>
          <div>
            <h2 className="text-white font-bold text-sm">Available Drivers</h2>
            <p className="text-slate-400 text-xs">{mockOffers.length} drivers nearby</p>
          </div>
        </div>

        {/* Offers List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {mockOffers.map((offer) => (
            <button
              key={offer.driverId}
              onClick={() => handleSelectOffer(offer.driverId)}
              className="w-full text-left rounded-2xl p-4 border-2 transition transform hover:scale-102 active:scale-95"
              style={{
                borderColor: selectedOffer === offer.driverId ? '#3b82f6' : '#334155',
                backgroundColor: selectedOffer === offer.driverId ? 'rgba(59, 130, 246, 0.1)' : '#1e293b'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-5xl">{offer.img}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg">{offer.name}</h3>
                    <p className="text-slate-400 text-xs">⭐ {offer.rating} • {offer.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-green-400">₹ {offer.fare}</div>
                  <p className="text-slate-400 text-xs">ETA {offer.eta}m</p>
                </div>
              </div>
              
              {selectedOffer === offer.driverId && (
                <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-3 text-center">
                  <p className="text-blue-300 font-bold text-sm">✓ Selected - Tap to continue</p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="bg-slate-800 border-t border-slate-700 px-4 py-4">
          <p className="text-slate-400 text-xs text-center">💬 You can message driver after selection</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Map Header */}
      <div className="relative h-40 bg-gradient-to-b from-slate-800 to-slate-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="text-9xl text-center leading-[160px]">🗺️</div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white font-bold text-lg">📍 Live Map</div>
            <p className="text-slate-400 text-xs">Your location & route</p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="flex-1 px-4 py-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pickup Input */}
          <div className="relative">
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full px-5 py-4 bg-slate-700 border-2 border-slate-600 text-white rounded-2xl focus:outline-none focus:border-blue-500 transition placeholder-slate-500 font-semibold text-lg"
              placeholder="📍 Pickup location"
            />
          </div>

          {/* Dropoff Input */}
          <div className="relative">
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full px-5 py-4 bg-slate-700 border-2 border-slate-600 text-white rounded-2xl focus:outline-none focus:border-blue-500 transition placeholder-slate-500 font-semibold text-lg"
              placeholder="🏁 Where to?"
            />
          </div>

          {/* Vehicle Type Selector */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'economy', icon: '🚗', name: 'Economy', price: '₹50/km' },
              { id: 'comfort', icon: '🚙', name: 'Comfort', price: '₹70/km' },
              { id: 'premium', icon: '🚕', name: 'Premium', price: '₹100/km' },
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setVehicleType(type.id)}
                className={`p-4 rounded-2xl border-2 transition font-bold text-center ${
                  vehicleType === type.id
                    ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                    : 'border-slate-600 bg-slate-700 text-slate-300'
                }`}
              >
                <div className="text-3xl mb-1">{type.icon}</div>
                <div className="text-xs">{type.name}</div>
                <div className="text-xs text-slate-400">{type.price}</div>
              </button>
            ))}
          </div>

          {/* Price Input */}
          <div className="relative mt-6">
            <label className="text-slate-400 text-xs font-semibold px-1 mb-2 block">💰 Your Offer</label>
            <div className="flex items-center gap-2 bg-slate-700 border-2 border-blue-500 rounded-2xl px-5 py-4">
              <span className="text-slate-400 text-2xl font-black">₹</span>
              <input
                type="number"
                value={riderFare}
                onChange={(e) => setRiderFare(e.target.value)}
                className="flex-1 bg-transparent text-white text-3xl font-black outline-none"
                placeholder="250"
              />
            </div>
            <p className="text-slate-400 text-xs mt-2 px-1">💡 Drivers will bid on your offer</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!dropoff.trim()}
            className="w-full py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-black text-lg rounded-2xl hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 transition transform active:scale-95 mt-8"
          >
            🔍 Find Drivers
          </button>
        </form>

        {/* Tips */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mt-6">
          <p className="text-blue-300 text-sm font-semibold mb-2">✨ Pro Tips:</p>
          <ul className="text-blue-200 text-xs space-y-1">
            <li>✅ Be competitive with your price</li>
            <li>✅ Chat before confirming ride</li>
            <li>✅ Drivers accept within 30 seconds</li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-700 bg-slate-900/95 backdrop-blur-md px-4 py-4 flex justify-around">
        <Link href="/" className="text-center text-slate-400 hover:text-white transition">
          <div className="text-2xl mb-1">🏠</div>
          <div className="text-xs">Home</div>
        </Link>
        <button className="text-center text-blue-400">
          <div className="text-2xl mb-1">🛵</div>
          <div className="text-xs">Book</div>
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
