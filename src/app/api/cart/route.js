// /src/app/api/cart/route.js

import { auth } from '@/lib/auth/auth' // <-- Import the new 'auth' function
import dbConnect from '@/lib/db'
import Cart from '@/models/Cart.model'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const session = await auth() // <-- 1. Get the session by calling auth()

    if (!session?.user?.id) { // <-- 2. Check for session and user.id
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id // <-- 3. Get the userId
    const product_data = await request.json()
    const { productId, quantity } = product_data

    if (!productId || !quantity) {
      return NextResponse.json({ message: 'Missing product data' }, { status: 400 })
    }

    await dbConnect()

    let cart = await Cart.findOne({ userId: userId })

    if (!cart) {
      cart = await Cart.create({ userId: userId, items: [] })
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    )

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
      cart.items.push({ productId, quantity })
    }

    const updatedCart = await cart.save()

    return NextResponse.json(
      { message: 'Item added to cart successfully', cart: updatedCart },
      { status: 200 }
    )
  } catch (error) {
    console.error('[CART_POST_ERROR]', error)
    return NextResponse.json({ message: 'Failed to add item to cart.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth() // <-- Same change here

    if (!session?.user?.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    await dbConnect()

    // Ensure products is not null before accessing .items
    const cart = await Cart.findOne({ userId: userId }).populate('items.productId')
    
    if (!cart) {
        return NextResponse.json({ products: [] }, { status: 200 }); // Return empty array if no cart
    }

    return NextResponse.json({ products: cart.items })
  } catch (error) {
    console.error('[CART_GET_ERROR]', error)
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 })
  }
}
