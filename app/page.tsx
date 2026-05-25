import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-2xl md:text-3xl">🚗</div>
            <div className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              RideEase Pakistan
            </div>
          </div>
          <div className="flex gap-2 md:gap-4">
            <Link
              href="/login"
              className="px-3 md:px-6 py-2 text-slate-200 hover:text-white font-semibold transition text-sm md:text-base"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 md:px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition text-sm md:text-base"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-emerald-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-green-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-32">
          <div className="text-center space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Apni Ride,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
                {' '}
                Apni Qeemat
              </span>
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto px-2">
              Apni qaeemat set kare aur verified drivers ke saath ride karen. Pakistan ka sabse munasib ride-sharing platform.
            </p>

            <div className="flex gap-3 md:gap-6 justify-center pt-6 md:pt-8 flex-col md:flex-row">
              <Link
                href="/book-ride"
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold text-base md:text-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition transform hover:scale-105"
              >
                🛵 Book a Ride
              </Link>
              <Link
                href="/driver-home"
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-base md:text-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition transform hover:scale-105"
              >
                🚗 Drive & Earn
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-10 md:mb-16">RideEase kyun chunein?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {[
            { icon: '💰', title: 'Apni Qaeemat Lagaaye', desc: 'Riders apni qaeemat lagaate hain, drivers bid karte hain. Sabke liye منصفانہ۔' },
            { icon: '⚡', title: 'Bilkul Tez', desc: 'اوسط انتظار 5 منٹ سے کم۔ Real-time matching.' },
            { icon: '🛡️', title: 'محفوظ اور Secure', desc: '5-ستارہ drivers صرف۔ Verified profiles, in-app support.' },
            { icon: '📱', title: 'Live Chat Karo', desc: 'Apne driver se baat karo ride qubool karne se pehle۔' },
            { icon: '🗺️', title: 'Live Tracking', desc: 'Apni ride ko map par real-time track karo۔' },
            { icon: '⭐', title: 'Saaf Ratings', desc: 'Real reviews real users se۔ Koi nakli ratings nahi۔' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:border-slate-600 transition hover:shadow-xl hover:shadow-slate-600/20"
            >
              <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-600 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-5xl font-black mb-2">5M+</div>
              <p className="text-sm md:text-lg">Active Users</p>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-black mb-2">50M+</div>
              <p className="text-sm md:text-lg">Rides Completed</p>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-black mb-2">95%</div>
              <p className="text-sm md:text-lg">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-black mb-2">24/7</div>
              <p className="text-sm md:text-lg">Available Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 md:mb-6">Ready to Ride?</h2>
        <p className="text-base md:text-xl text-slate-300 mb-8 md:mb-10 max-w-2xl mx-auto px-2">
          Join millions who trust InDrive for fair, safe, and affordable rides.
        </p>
        <div className="flex gap-3 md:gap-6 justify-center flex-col md:flex-row">
          <Link
            href="/book-ride"
            className="px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 rounded-xl font-bold text-base md:text-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Get Started as Rider
          </Link>
          <Link
            href="/driver-home"
            className="px-6 md:px-8 py-3 md:py-4 bg-slate-800 text-white border-2 border-slate-600 rounded-xl font-bold text-base md:text-lg hover:bg-slate-700 transition"
          >
            Start Driving
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm md:text-base">
          <p>&copy; 2026 InDrive. Fair rides for everyone.</p>
        </div>
      </footer>
    </div>
  )
}
