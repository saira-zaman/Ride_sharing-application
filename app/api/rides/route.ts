import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Ride from '@/app/lib/models/Ride'
import { calculateFare } from '@/app/lib/helpers'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const {
      riderId,
      pickupLocation,
      dropoffLocation,
      distance,
      duration,
      vehicleType = 'economy',
    } = await req.json()

    // Validation
    if (!riderId || !pickupLocation || !dropoffLocation || !distance) {
      throw new AppError('Missing required fields', 400)
    }

    // Calculate estimated fare
    const estimatedFare = calculateFare(distance, duration || 0)

    // Create ride request
    const ride = await Ride.create({
      riderId,
      pickupLocation,
      dropoffLocation,
      distance,
      duration: duration || 0,
      estimatedFare,
      vehicleType,
      status: 'requested',
      driverOffers: [],
    })

    return NextResponse.json(
      {
        success: true,
        ride: await Ride.findById(ride._id).populate('riderId', 'name phone'),
      },
      { status: 201 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const riderId = searchParams.get('riderId')
    const driverId = searchParams.get('driverId')

    let query: any = {}

    if (riderId) {
      query.riderId = riderId
    }

    if (driverId) {
      query.driverId = driverId
    }

    if (!riderId && !driverId) {
      throw new AppError('riderId or driverId is required', 400)
    }

    const rides = await Ride.find(query)
      .sort({ createdAt: -1 })
      .populate('riderId', 'name phone rating')
      .populate('driverId', 'name phone rating')
      .populate('driverOffers.driverId', 'name phone rating profileImage')

    return NextResponse.json(
      {
        success: true,
        rides,
      },
      { status: 200 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
