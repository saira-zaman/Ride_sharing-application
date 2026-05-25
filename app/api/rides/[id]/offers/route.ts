import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Ride from '@/app/lib/models/Ride'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function POST(req: NextRequest, context: any) {
  try {
    await connectDB()

    const { rideId } = context.params
    const { driverId, offeredFare, vehicleType, vehicleNumber, driverRating, eta } =
      await req.json()

    // Validation
    if (!driverId || !offeredFare || !vehicleType) {
      throw new AppError('Missing required fields', 400)
    }

    // Get ride and check if it exists
    const ride = await Ride.findById(rideId)
    if (!ride) {
      throw new AppError('Ride not found', 404)
    }

    // Check if ride is still in requested state
    if (ride.status !== 'requested') {
      throw new AppError('Ride is no longer available', 400)
    }

    // Check if driver already submitted an offer
    const existingOffer = ride.driverOffers?.find(
      (offer: any) => offer.driverId?.toString() === driverId
    )
    if (existingOffer) {
      throw new AppError('You have already submitted an offer for this ride', 400)
    }

    // Add driver offer
    ride.driverOffers.push({
      driverId,
      offeredFare,
      vehicleType,
      vehicleNumber,
      driverRating: driverRating || 5,
      eta: eta || 5,
      status: 'pending',
      createdAt: new Date(),
    })

    await ride.save()

    return NextResponse.json(
      {
        success: true,
        message: 'Offer submitted successfully',
        ride,
      },
      { status: 201 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}

export async function GET(req: NextRequest, context: any) {
  try {
    await connectDB()

    const { rideId } = context.params

    const ride = await Ride.findById(rideId)
      .populate('driverOffers.driverId', 'name phone rating profileImage')
      .populate('riderId', 'name phone')

    if (!ride) {
      throw new AppError('Ride not found', 404)
    }

    return NextResponse.json(
      {
        success: true,
        offers: ride.driverOffers || [],
        ride,
      },
      { status: 200 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
