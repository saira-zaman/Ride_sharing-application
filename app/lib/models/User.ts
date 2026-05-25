import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: true,
    },
    userType: {
      type: String,
      enum: ['rider', 'driver', 'admin'],
      default: 'rider',
    },
    profileImage: String,
    emergencyContacts: [{
      name: String,
      phone: String,
    }],
    
    // Verification
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isIdentityVerified: {
      type: Boolean,
      default: false,
    },
    identityDoc: String,
    
    // Status
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    
    // Ratings
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    
    // Ride Statistics
    totalRides: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    
    // Driver Specific Fields
    driverLicense: {
      number: String,
      expiryDate: Date,
    },
    vehicleInfo: {
      type: String,
      licensePlate: String,
      model: String,
      year: Number,
      color: String,
      insuranceDoc: String,
    },
    bankAccount: {
      accountNumber: String,
      accountHolder: String,
      bankName: String,
      ifsc: String,
    },
    isAcceptingRides: {
      type: Boolean,
      default: false,
    },
    currentLocation: {
      latitude: Number,
      longitude: Number,
      timestamp: Date,
    },
    
    // Device & Push Notifications
    deviceTokens: [String],
    notificationPreferences: {
      rideRequests: {
        type: Boolean,
        default: true,
      },
      messages: {
        type: Boolean,
        default: true,
      },
      promotions: {
        type: Boolean,
        default: false,
      },
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

// Index for geospatial queries
UserSchema.index({ 'currentLocation': '2dsphere' })
UserSchema.index({ userType: 1, isOnline: 1 })

export default mongoose.models.User || mongoose.model('User', UserSchema)
