import dbConnect from '@/lib/db'
import User from '@/models/User.model'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    await dbConnect()
    let users = await User.find({})
    return NextResponse.json(
      {
        success: true,
        message: 'Users retrieved successfully.',
        data: users,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error retrieving users.',
        error: error.message,
      },
      { status: 500 } // Internal Server Error
    )
  }
}
