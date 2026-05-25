import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Ride from '@/app/lib/models/Ride'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function PATCH(req: NextRequest, context: any) {
  try {
    await connectDB()

    const { id } = context.params
    const { status, driverId, rating, comment } = await req.json()

    if (!id) {
      throw new AppError('Ride ID is required', 400)
    }

    const ride = await Ride.findByIdAndUpdate(
      id,
      {
        status,
        driverId,
        ...(rating && {
          'rating.driverRating': rating,
          'rating.driverComment': comment,
        }),
        ...(status === 'completed' && { completedAt: new Date() }),
      },
      { new: true }
    )

    if (!ride) {
      throw new AppError('Ride not found', 404)
    }

    return NextResponse.json(
      {
        success: true,
        ride,
      },
      { status: 200 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}

export async function GET(req: NextRequest, context: any) {
  try {
    await connectDB()

    const { id } = context.params

    const ride = await Ride.findById(id)
      .populate('riderId', 'name phone email rating profileImage')
      .populate('driverId', 'name phone email rating profileImage')
      .populate('driverOffers.driverId', 'name phone email rating profileImage')

    if (!ride) {
      throw new AppError('Ride not found', 404)
    }

    return NextResponse.json(
      {
        success: true,
        ride,
      },
      { status: 200 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
