import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Ride from '@/app/lib/models/Ride'
import User from '@/app/lib/models/User'
import { errorHandler, AppError } from '@/app/lib/errors'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const riderId = req.headers.get('x-user-id')

    if (!riderId) {
      throw new AppError('User ID is required', 400)
    }

    const rides = await Ride.find({
      $or: [
        { riderId, status: { $ne: 'completed' } },
        { riderId, status: 'completed' },
      ],
    })
      .populate('driverId', 'name phone rating profileImage vehicleInfo')
      .sort({ createdAt: -1 })
      .limit(20)

    return NextResponse.json({ success: true, rides })
  } catch (error) {
    return errorHandler(error)
  }
}
