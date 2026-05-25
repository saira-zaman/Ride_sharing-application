import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import User from '@/app/lib/models/User'
import { comparePasswords, generateToken } from '@/app/lib/auth'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await req.json()

    // Validation
    if (!email || !password) {
      throw new AppError('Email and password are required', 400)
    }

    // Find user
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    // Check password
    const isPasswordValid = await comparePasswords(password, user.password)
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401)
    }

    if (!user.isActive) {
      throw new AppError('Account is inactive', 403)
    }

    // Generate token
    const token = generateToken(user._id.toString())

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        },
        token,
      },
      { status: 200 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
