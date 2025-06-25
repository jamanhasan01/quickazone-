// app/api/auth/login/route.js

import dbConnect from '@/lib/db'
import User from '@/models/User.model'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(request) {
  await dbConnect()

  const { email, password } = await request.json()

  try {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, photoURl: user.photoURl },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      }
    )

    const userWithoutPassword = user.toObject()
    delete userWithoutPassword.password

    return NextResponse.json(
      {
        status: 'success',
        token,
        user: userWithoutPassword,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Server error during login' }, { status: 500 })
  }
}
