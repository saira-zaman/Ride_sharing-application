'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Login failed')
      }

      const data = await response.json()
      // Store token in localStorage
      localStorage.setItem('token', data.token)
      
      // Redirect to dashboard
      window.location.href = '/dashboard'
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">🚗</div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-2">RideShare</h1>
            <p className="text-slate-400 font-semibold">Welcome Back, Rider!</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
              <p className="font-semibold">❌ {error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="text-slate-300 text-sm font-semibold block mb-2">📧 Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-slate-700 border border-slate-600 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-slate-300 text-sm font-semibold block mb-2">🔐 Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-slate-700 border border-slate-600 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black text-lg rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/50 disabled:opacity-50 transition transform active:scale-95"
            >
              {loading ? '⏳ Logging in...' : '✨ Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-slate-500 text-sm">New to RideShare?</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Sign Up Link */}
          <Link href="/register" className="w-full block py-4 border-2 border-slate-600 text-white font-black text-center rounded-2xl hover:bg-slate-700/50 transition">
            📝 Create Account
          </Link>

          {/* Footer */}
          <p className="text-center mt-6 text-slate-400 text-sm">
            By logging in, you agree to our{' '}
            <span className="text-emerald-400 hover:underline cursor-pointer">Terms of Service</span>
          </p>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            🚙 Enjoy safe rides with professional drivers
          </p>
        </div>
      </div>
    </div>
  )
}
