import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import User from '@/app/lib/models/User'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const userType = searchParams.get('userType')

    let query = {}
    if (userType) {
      query = { userType }
    }

    const users = await User.find(query).select('-password')

    return NextResponse.json(
      {
        success: true,
        users,
      },
      { status: 200 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
