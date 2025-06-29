import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { auth } from '@/lib/auth/auth' // <-- 1. Import the new 'auth' function 
import ProductModel from '@/models/Product.model'
import dbConnect from '@/lib/db' 

export async function POST(request) {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Unauthorized: Admin access required.' },
      { status: 401 }
    )
  }

  await dbConnect()

  try {
    const body = await request.json()


    const newProduct = new ProductModel({
      user: session.user.id,
      name: body.product_name,
      price: body.product_price,
      brand: body.brand,
      category: body.category,
      countInStock: body.countInStock,
      description: body.description,
      image: body.photoURL,
    })

    const savedProduct = await newProduct.save()

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully.',
        id: savedProduct._id,
        data: savedProduct,
      },
      { status: 201 } 
    )
  } catch (error) {
    console.error('Failed to create product:', error) 

    if (error.name === 'ValidationError') {
      let errors = {}
      for (const field in error.errors) {
        errors[field] = error.errors[field].message
      }
      return NextResponse.json(
        { success: false, message: 'Validation failed.', errors },
        { status: 400 } 
      )
    }


    return NextResponse.json(
      { success: false, message: 'Failed to create product.', error: error.message },
      { status: 500 } 
    )
  }
}

export async function GET() {
  await dbConnect()
  try {
    const products = await ProductModel.find({}).sort({ createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        message: 'Products fetched successfully.',
        data: products,
      },
      { status: 200 } 
    )
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while fetching products.',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
