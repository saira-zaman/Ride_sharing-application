import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import User from '@/app/lib/models/User'
import { hashPassword, generateToken } from '@/app/lib/auth'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { name, email, password, phone, userType } = await req.json()

    // Validation
    if (!name || !email || !password || !phone) {
      throw new AppError('All fields are required', 400)
    }

    if (password.length < 6) {
      throw new AppError('Password must be at least 6 characters', 400)
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new AppError('Email already registered', 409)
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      userType: userType || 'rider',
    })

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
      { status: 201 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
