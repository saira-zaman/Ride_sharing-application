import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Ride from '@/app/lib/models/Ride'
import { AppError, errorHandler } from '@/app/lib/errors'

// Mock available rides for testing
const mockAvailableRides = [
  {
    _id: '507f1f77bcf86cd799439012',
    riderId: { _id: '507f1f77bcf86cd799439001', name: 'Amit Kumar', phone: '9876543210', rating: 4.8, totalRides: 42 },
    pickupLocation: { address: 'Sector 11, Noida', coordinates: { latitude: 28.5721, longitude: 77.3563 } },
    dropoffLocation: { address: 'CP, Delhi', coordinates: { latitude: 28.6328, longitude: 77.1197 } },
    estimatedFare: 350,
    distance: 25.3,
    duration: 45,
    vehicleType: 'economy',
    status: 'requested',
    createdAt: new Date(),
  },
  {
    _id: '507f1f77bcf86cd799439013',
    riderId: { _id: '507f1f77bcf86cd799439002', name: 'Priya Singh', phone: '9123456789', rating: 4.9, totalRides: 67 },
    pickupLocation: { address: 'Gurugram Tech Park', coordinates: { latitude: 28.4595, longitude: 77.0829 } },
    dropoffLocation: { address: 'Delhi Airport', coordinates: { latitude: 28.5562, longitude: 77.1002 } },
    estimatedFare: 450,
    distance: 35.0,
    duration: 60,
    vehicleType: 'comfort',
    status: 'requested',
    createdAt: new Date(),
  },
]

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const driverId = searchParams.get('driverId')

    if (!driverId) {
      throw new AppError('driverId is required', 400)
    }

    // For mock mode, return mock available rides
    if (process.env.MONGODB_URI?.includes('username:password')) {
      return NextResponse.json(
        {
          success: true,
          rides: mockAvailableRides,
        },
        { status: 200 }
      )
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
