import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import User from '@/app/lib/models/User'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function POST(req: NextRequest, context: any) {
  try {
    await connectDB()

    const { id } = context.params
    const updateData = await req.json()

    // Don't allow password updates through this endpoint
    if (updateData.password) {
      throw new AppError('Cannot update password through this endpoint', 400)
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password')

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
