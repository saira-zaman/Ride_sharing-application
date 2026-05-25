import mongoose from 'mongoose'

const RideSchema = new mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    pickupLocation: {
      address: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    dropoffLocation: {
      address: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    status: {
      type: String,
      enum: ['requested', 'searching', 'accepted', 'arriving', 'in_progress', 'completed', 'cancelled'],
      default: 'requested',
    },
    // Fare Negotiation (InDrive Style)
    estimatedFare: Number,
    riderOfferedFare: Number,
    
    // Multiple Driver Offers
    driverOffers: [
      {
        driverId: mongoose.Schema.Types.ObjectId,
        offeredFare: Number,
        vehicleType: String,
        vehicleNumber: String,
        driverRating: Number,
        eta: Number,
        createdAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
      },
    ],
    
    acceptedOfferId: mongoose.Schema.Types.ObjectId,
    driverAcceptedFare: Number,
    finalFare: Number,
    distance: Number,
    duration: Number,
    
    // Vehicle Info
    vehicleType: {
      type: String,
      enum: ['economy', 'comfort', 'premium'],
      default: 'economy',
    },
    vehicleNumber: String,
    vehicleModel: String,
    
    // Payment
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'wallet'],
      default: 'cash',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    
    // Real-time tracking
    currentLocation: {
      latitude: Number,
      longitude: Number,
      timestamp: Date,
    },
    routeHistory: [{
      latitude: Number,
      longitude: Number,
      timestamp: Date,
    }],
    
    // Safety Features
    sosTriggered: {
      type: Boolean,
      default: false,
    },
    sosContacts: [String],
    
    // Rating & Review
    rating: {
      riderRating: {
        type: Number,
        min: 1,
        max: 5,
      },
      driverRating: {
        type: Number,
        min: 1,
        max: 5,
      },
      riderComment: String,
      driverComment: String,
      ratedAt: Date,
    },
    
    // Timestamps
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    acceptedAt: Date,
    startedAt: Date,
    completedAt: Date,
    cancelledAt: Date,
    cancellationReason: String,
    cancelledBy: { type: String, enum: ['rider', 'driver'] },
    
    // Chat & Communication
    lastMessageAt: Date,
    unreadRiderMessages: { type: Number, default: 0 },
    unreadDriverMessages: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Index for efficient queries
RideSchema.index({ riderId: 1, createdAt: -1 })
RideSchema.index({ driverId: 1, createdAt: -1 })
RideSchema.index({ status: 1 })
RideSchema.index({ 'pickupLocation.coordinates': '2dsphere' })
RideSchema.index({ 'driverOffers.driverId': 1 })
RideSchema.index({ 'driverOffers.status': 1 })

export default mongoose.models.Ride || mongoose.model('Ride', RideSchema)
