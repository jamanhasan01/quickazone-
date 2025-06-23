
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; // Adjust path if needed
import ProductModel from '@/models/Product.model';
import dbConnect from '@/lib/db';

export async function POST(request) {
  // 1. Check if the user is authenticated and is an admin (best practice)
  const session = await getServerSession(authOptions);
  console.log("session prient " ,session);
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Unauthorized: Admin access required.' },
      { status: 401 }
    );
  }

  // 2. Connect to the database
  await dbConnect();

  try {
    // 3. Get the form data from the request body
    const body = await request.json();
    console.log("i get value from body req",body);
    
    // 4. Create a new product instance with the form data
    const newProduct = new ProductModel({
      // The user creating the product is the logged-in admin
      user: session.user.id,
      name: body.name,
      price: body.price,
      brand: body.brand,
      category: body.category,
      countInStock: body.countInStock,
      description: body.description,
      // Assuming 'images' is an array of URLs sent from the form
      images: body.images || [],
    });
console.log('create product ',newProduct);

    // 5. Save the new product to the database
    const savedProduct = await newProduct.save();

    // 6. Return a success response with the created product data
    return NextResponse.json(
      { success: true, message: 'Product created successfully.', data: savedProduct },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    // Handle potential errors, including validation errors from Mongoose
    return NextResponse.json(
      { success: false, message: 'Failed to create product.', error: error.message },
      { status: 400 } // 400 Bad Request
    );
  }
}