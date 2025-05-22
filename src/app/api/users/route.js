import dbConnect from '@/lib/db'
import User from '@/models/User.model'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request) {
  await dbConnect()
  try {
    let {fullname,email,password,photoURL}=await request.json()
   
  
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const newUser = new User({ fullname, email, passwordHash: password,photoURL})
    console.log(newUser);
    
    await newUser.save()

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  await dbConnect()
  try {
    const users = await User.find({})
    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
