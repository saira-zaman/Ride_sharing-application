import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json(
    {
      success: true,
      message: 'API is running',
      version: '1.0.0',
      timestamp: new Date(),
    },
    { status: 200 }
  )
}
