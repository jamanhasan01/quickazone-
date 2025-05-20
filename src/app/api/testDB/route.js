// app/api/test-db/route.js
import dbConnect from '@/lib/db';

export async function GET() {
  try {
    await dbConnect();
    return Response.json({ message: 'MongoDB Connected!' }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}