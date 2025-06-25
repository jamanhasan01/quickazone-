import dbConnect from '@/lib/db'
import User from '@/models/User.model'

const { NextResponse } = require('next/server')

// post route for create user
export const POST = async (request) => {
  try {
    await dbConnect()

    let { fullname, email, role, password, photoURL } = await request.json()


    let userExists = await User.findOne({ email })

    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 })
    }

    let savedData = new User({
      fullname,
      email,
      role,
      password,
      photoURL,
    })

    await savedData.save()

    return NextResponse.json({ user: savedData }, { status: 201 })
  } catch (error) {
    if (error.name == 'ValidationError') {
      let errors = {}
      for (const items in error.errors) {
        console.log(errors[items])

        errors[items] = error.errors[items].message
      }

      return NextResponse.json({ message: 'Something went wrong', errors }, { status: 500 })
    }
  }
}

export const GET = (request) => {
  return NextResponse.json({ message: 'hello form registration' })
}
