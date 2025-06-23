import dbConnect from '@/lib/db';
import User from '@/models/User.model';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // ▼ FIX: These two lines have been swapped. ▼

    // 1. Ensure the database is connected FIRST.
    await dbConnect();

    // 2. NOW it is safe to get the user ID from the dynamic route parameter.
    const { id } = params;

    // 3. Find the user by their ID.
    const user = await User.findById(id);

    // If no user is found with that ID
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    // Return the single user's data
    return NextResponse.json(
      {
        success: true,
        message: 'User retrieved successfully.',
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle potential errors, e.g., an invalid ID format
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while retrieving the user.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}