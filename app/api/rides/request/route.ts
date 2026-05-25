import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Ride from '@/app/lib/models/Ride'
import User from '@/app/lib/models/User'
import { calculateFare, calculateDistance } from '@/app/lib/helpers'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { pickupLocation, dropoffLocation, vehicleType, riderOfferedFare } = await req.json()

    // Validation
    if (!pickupLocation || !dropoffLocation) {
      throw new AppError('Pickup and dropoff locations are required', 400)
    }

    // Get rider ID from token (simplified - you should verify JWT)
    const riderId = req.headers.get('x-user-id')

    // Calculate estimated fare
    const distance = 5 // Mock distance - should be calculated from coords
    const estimatedFare = calculateFare(distance, 15)

    // Create ride with rider's offer
    const ride = await Ride.create({
      riderId,
      pickupLocation,
      dropoffLocation,
      vehicleType,
      distance,
      duration: 15,
      estimatedFare,
      riderOfferedFare: riderOfferedFare || estimatedFare,
      status: 'requested',
    })

    // Send ride request to nearby drivers (WebSocket implementation needed)

    return NextResponse.json(
      {
        success: true,
        ride,
        message: 'Ride request created. Searching for drivers...',
      },
      { status: 201 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
