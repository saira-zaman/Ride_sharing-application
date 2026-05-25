import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">🚗 RideShare</h1>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Your Journey Starts Here
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Safe, affordable, and convenient ride-sharing service available 24/7
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Book in Seconds</h3>
            <p className="text-gray-600">Quick and easy booking process</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Affordable Fares</h3>
            <p className="text-gray-600">Transparent pricing with no hidden charges</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
            <p className="text-gray-600">Verified drivers and secure payment</p>
          </div>
        </div>

        <div className="mt-12 space-x-4">
          <Link href="/register?type=rider" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 inline-block">
            Book a Ride
          </Link>
          <Link href="/register?type=driver" className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white inline-block">
            Become a Driver
          </Link>
        </div>
      </section>
    </main>
  )
}
