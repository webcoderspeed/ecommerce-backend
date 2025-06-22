
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  })
}

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded as { id: string }
  } catch (error) {
    return null
  }
}

