import { NextRequest, NextResponse } from 'next/server'

export class AppError extends Error {
  public statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorHandler = (error: unknown) => {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  )
}

export const validateRequest = (req: NextRequest, requiredFields: string[]): string | null => {
  const contentType = req.headers.get('content-type')

  if (!contentType?.includes('application/json')) {
    return 'Content-Type must be application/json'
  }

  return null
}
