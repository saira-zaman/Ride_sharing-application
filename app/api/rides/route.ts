import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Ride from '@/app/lib/models/Ride'
import { calculateFare } from '@/app/lib/helpers'
import { AppError, errorHandler } from '@/app/lib/errors'

// Mock data for testing
const mockRides = [
  {
    _id: '507f1f77bcf86cd799439011',
    riderId: '507f1f77bcf86cd799439001',
    pickupLocation: { address: 'Connaught Place, New Delhi', coordinates: { latitude: 28.6328, longitude: 77.1197 } },
    dropoffLocation: { address: 'Hauz Khas, New Delhi', coordinates: { latitude: 28.5494, longitude: 77.1955 } },
    distance: 12.5,
    duration: 35,
    estimatedFare: 250,
    vehicleType: 'economy',
    status: 'requested',
    driverOffers: [],
    createdAt: new Date(),
  },
]

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

    // For mock mode, return mock ride
    if (process.env.MONGODB_URI?.includes('username:password')) {
      const mockRide = {
        _id: Math.random().toString(36).substr(2, 9),
        riderId,
        pickupLocation,
        dropoffLocation,
        distance,
        duration: duration || 0,
        estimatedFare,
        vehicleType,
        status: 'requested',
        driverOffers: [],
        createdAt: new Date(),
      }
      return NextResponse.json({ success: true, ride: mockRide }, { status: 201 })
    }

    // Create ride request in real DB
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

    // For mock mode, return mock rides
    if (process.env.MONGODB_URI?.includes('username:password')) {
      return NextResponse.json(
        {
          success: true,
          rides: riderId ? mockRides.filter((r) => r.riderId === riderId) : mockRides,
        },
        { status: 200 }
      )
    }

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
