import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Ride from '@/app/lib/models/Ride'
import User from '@/app/lib/models/User'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function POST(req: NextRequest, context: any) {
  try {
    await connectDB()

    const { rideId, offerId } = context.params
    const { action } = await req.json()

    // Validation
    if (!action || !['accept', 'reject'].includes(action)) {
      throw new AppError('Invalid action. Use accept or reject', 400)
    }

    const ride = await Ride.findById(rideId)
    if (!ride) {
      throw new AppError('Ride not found', 404)
    }

    // Find the offer
    const offerIndex = ride.driverOffers?.findIndex(
      (offer: any) => offer._id?.toString() === offerId
    )

    if (offerIndex === undefined || offerIndex === -1) {
      throw new AppError('Offer not found', 404)
    }

    const offer = ride.driverOffers[offerIndex]

    if (action === 'accept') {
      // Accept the offer
      offer.status = 'accepted'
      ride.driverOffers.forEach((o: any, i: number) => {
        if (i !== offerIndex) {
          o.status = 'rejected'
        }
      })

      ride.status = 'accepted'
      ride.driverId = offer.driverId
      ride.driverAcceptedFare = offer.offeredFare
      ride.finalFare = offer.offeredFare
      ride.acceptedOfferId = offer._id
      ride.acceptedAt = new Date()

      await ride.save()

      // Update driver stats
      await User.findByIdAndUpdate(offer.driverId, {
        isAcceptingRides: false,
      })

      return NextResponse.json(
        {
          success: true,
          message: 'Offer accepted',
          ride: await Ride.findById(rideId).populate('driverId', 'name phone'),
        },
        { status: 200 }
      )
    } else {
      // Reject the offer
      offer.status = 'rejected'
      await ride.save()

      return NextResponse.json(
        {
          success: true,
          message: 'Offer rejected',
        },
        { status: 200 }
      )
    }
  } catch (error) {
    return errorHandler(error)
  }
}
