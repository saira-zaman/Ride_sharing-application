import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Ride from '@/app/lib/models/Ride'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const driverId = searchParams.get('driverId')
    const latitude = parseFloat(searchParams.get('latitude') || '0')
    const longitude = parseFloat(searchParams.get('longitude') || '0')

    if (!driverId) {
      throw new AppError('driverId is required', 400)
    }

    // Find ride requests where driver hasn't already submitted an offer
    const availableRides = await Ride.find({
      status: 'requested',
      'driverOffers.driverId': { $ne: driverId },
    })
      .populate('riderId', 'name phone rating totalRides')
      .sort({ createdAt: -1 })
      .limit(50)

    return NextResponse.json(
      {
        success: true,
        rides: availableRides,
      },
      { status: 200 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
