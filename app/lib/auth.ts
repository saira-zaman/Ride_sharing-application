import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcryptjs.compare(password, hashedPassword)
}

export const generateToken = (userId: string): string => {
  const secret = process.env.NEXTAUTH_SECRET

  if (!secret) {
    throw new Error('NEXTAUTH_SECRET is not defined')
  }

  return jwt.sign({ userId }, secret, { expiresIn: '7d' })
}

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const secret = process.env.NEXTAUTH_SECRET

    if (!secret) {
      throw new Error('NEXTAUTH_SECRET is not defined')
    }

    return jwt.verify(token, secret) as { userId: string }
  } catch (error) {
    return null
  }
}
