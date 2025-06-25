import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth' // Ensure this path is correct
import ProductModel from '@/models/Product.model' // Ensure this path is correct
import dbConnect from '@/lib/db' // Ensure this path is correct

export async function POST(request) {
  // 1. Check if the user is authenticated and is an admin
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Unauthorized: Admin access required.' },
      { status: 401 }
    )
  }

  // 2. Connect to the database
  await dbConnect()

  try {
    // 3. Get the JSON body from the request
    const body = await request.json()

    // 4. Create a new product instance with the CORRECT field names from the client
    const newProduct = new ProductModel({
      user: session.user.id, // The user creating the product
      name: body.product_name, // MODIFIED: was body.name
      price: body.product_price, // MODIFIED: was body.price
      brand: body.brand,
      category: body.category,
      countInStock: body.countInStock,
      description: body.description,
      image: body.photoURL, // MODIFIED: was body.image, now uses the URL from upload
    })

    // 5. Save the new product to the database (this will also trigger Mongoose validation)
    const savedProduct = await newProduct.save()

    // 6. Return a success response with the created product data, including its new ID
    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully.',
        // The client expects an 'id' for redirection, so we send the whole product
        // MongoDB uses `_id`, but Mongoose models allow virtual `id` access.
        id: savedProduct._id,
        data: savedProduct,
      },
      { status: 201 } // 201 Created
    )
  } catch (error) {
    console.error('Failed to create product:', error) // Log the actual error on the server

    // IMPROVED: Specifically handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      let errors = {}
      for (const field in error.errors) {
        errors[field] = error.errors[field].message
      }
      return NextResponse.json(
        { success: false, message: 'Validation failed.', errors },
        { status: 400 } // 400 Bad Request
      )
    }

    // Generic error for other issues
    return NextResponse.json(
      { success: false, message: 'Failed to create product.', error: error.message },
      { status: 500 } // 500 Internal Server Error is more appropriate
    )
  }
}

export async function GET() {
  await dbConnect()
  try {
    // Find all products and sort by creation date (newest first)
    const products = await ProductModel.find({}).sort({ createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        message: 'Products fetched successfully.',
        data: products,
      },
      { status: 200 } // MODIFIED: 200 OK is the correct status for a successful GET
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
