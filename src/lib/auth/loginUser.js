// lib/auth/loginUser.js

import User from '@/models/User.model'
import bcrypt from 'bcrypt'            // make sure it's installed
import dbConnect from '../db'

export async function loginUser(email, password) {
  try {
    await dbConnect()

    const user = await User.findOne({ email })
    if (!user) {
      return { status: 'error', message: 'User not found' }
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return { status: 'error', message: 'Invalid credentials' }
    }

    return {
      status: 'success',
      user: {
        _id: user._id.toString(),
        email: user.email,
        fullname: user.fullname,
        photoURL: user.photoURL,
        role: user.role,
      },
    }
  } catch (error) {

    return { status: 'error', message: 'Something went wrong' }
  }
}






