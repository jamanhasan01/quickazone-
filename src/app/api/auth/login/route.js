// app/api/auth/login/route.js

import dbConnect from '@/lib/db'
import User from '@/models/User.model'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(request) {
  await dbConnect() // Ensure DB connection

  const { email, password } = await request.json()


  try {
    // 1. Find the user by email
    // Select password explicitly because it's set to `select: false` in the schema
    const user = await User.findOne({ email }).select('+password')
    console.log(user);
    
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    // 2. Compare the provided password with the hashed password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    // 3. Generate a JWT
    const token = jwt.sign({ id: user._id, role: user.role,photoURl:user.photoURl }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    })

    // 4. Send success response with the token
    // Exclude password from the user object sent to the client
    const userWithoutPassword = user.toObject() // Convert Mongoose document to plain JS object
    delete userWithoutPassword.password // Remove the password field

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
