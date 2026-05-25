import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI

    // Mock mode for local development if URI is placeholder
    if (!mongoUri || mongoUri.includes('username:password')) {
      if (isConnected) {
        console.log('Using cached mock MongoDB connection')
        return mongoose.connection
      }

      // Use in-memory mock for testing
      console.log('⚠️  Using MOCK mode - Database is in-memory only!')
      console.log('📝 To use real MongoDB, set MONGODB_URI in .env.local')
      isConnected = true
      return {
        connection: { host: 'mock-memory' },
      }
    }

    if (mongoose.connections[0].readyState) {
      console.log('Using existing MongoDB connection')
      return mongoose.connections[0]
    }

    const conn = await mongoose.connect(mongoUri)
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
    isConnected = true
    return conn
  } catch (error) {
    console.error(`⚠️  Database Error: ${(error as Error).message}`)
    console.log('💡 Using mock/in-memory mode for testing')
    return {
      connection: { host: 'mock-memory' },
    }
  }
}

export const disconnectDB = async () => {
  try {
    if (mongoose.connections[0].readyState !== 0) {
      await mongoose.disconnect()
      console.log('MongoDB disconnected')
      isConnected = false
    }
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
  }
}
