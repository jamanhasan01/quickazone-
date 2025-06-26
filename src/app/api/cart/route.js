import { authOptions } from '@/lib/auth/auth'
import dbConnect from '@/lib/db'
import Cart from '@/models/Cart.model'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const product_data = await request.json()
    const { productId, quantity } = product_data
    const { user } = await getServerSession(authOptions)

    const userId = user?.id
    console.log('session print from card rout ', userId)

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
    const { user } = await getServerSession(authOptions)
    const userId = user.id
    await dbConnect()
    let products = await Cart.findOne({ userId: userId }).populate('items.productId')
    console.log('log form cart route in get req ', products.items)

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ message: 'An Iternal server error' }, { status: 500 })
  }
}
