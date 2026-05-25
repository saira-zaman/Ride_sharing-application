import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Message from '@/app/lib/models/Message'
import Ride from '@/app/lib/models/Ride'
import { AppError, errorHandler } from '@/app/lib/errors'

export async function GET(req: NextRequest, context: any) {
  try {
    await connectDB()

    const { rideId } = context.params
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const ride = await Ride.findById(rideId)
    if (!ride) {
      throw new AppError('Ride not found', 404)
    }

    const messages = await Message.find({ rideId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('senderId', 'name profileImage')
      .populate('receiverId', 'name profileImage')

    return NextResponse.json(
      {
        success: true,
        messages: messages.reverse(),
        total: await Message.countDocuments({ rideId }),
      },
      { status: 200 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}

export async function POST(req: NextRequest, context: any) {
  try {
    await connectDB()

    const { rideId } = context.params
    const { senderId, receiverId, message, messageType = 'text' } = await req.json()

    // Validation
    if (!senderId || !receiverId || !message) {
      throw new AppError('Missing required fields', 400)
    }

    const ride = await Ride.findById(rideId)
    if (!ride) {
      throw new AppError('Ride not found', 404)
    }

    // Create message
    const newMessage = await Message.create({
      rideId,
      senderId,
      receiverId,
      message,
      messageType,
      isRead: false,
    })

    // Update ride's last message timestamp
    ride.lastMessageAt = new Date()
    if (ride.riderId?.toString() === senderId) {
      ride.unreadDriverMessages = (ride.unreadDriverMessages || 0) + 1
    } else {
      ride.unreadRiderMessages = (ride.unreadRiderMessages || 0) + 1
    }
    await ride.save()

    return NextResponse.json(
      {
        success: true,
        message: newMessage,
      },
      { status: 201 }
    )
  } catch (error) {
    return errorHandler(error)
  }
}
