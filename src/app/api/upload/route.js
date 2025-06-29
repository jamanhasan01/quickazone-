import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { Readable } from 'stream'

export async function POST(req) {
  console.log('Vercel Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'NOT SET')
  console.log('Vercel API Key:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'NOT SET')
  console.log('Vercel API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'NOT SET')
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ message: 'No file was uploaded.' }, { status: 400 })
    }

    // Convert the file data into a buffer, which is a reliable format for uploads.
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    // Use a Promise to cleanly handle the asynchronous upload stream.
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'nextjs-auth-app', // Your folder in Cloudinary
          resource_type: 'image', // It's good practice to be explicit
        },
        (error, result) => {
          if (error) {
            // If Cloudinary returns an error, reject the promise.
            console.error('Cloudinary Error:', error)
            return reject(error)
          }
          // If successful, resolve the promise with the full result.
          resolve(result)
        }
      )

      // Create a readable stream from the buffer and pipe it to Cloudinary's uploader.
      Readable.from(fileBuffer).pipe(uploadStream)
    })

    // --- CRITICAL IMPROVEMENT ---
    // Here we explicitly check if the upload was successful and if we received a secure URL.
    // This prevents sending an empty or undefined URL to the frontend.
    if (!uploadResult || !uploadResult.secure_url) {
      console.error('Cloudinary upload failed or did not return a secure URL.', uploadResult)
      return NextResponse.json(
        { message: 'Image upload failed on the server. Please try again.' },
        { status: 500 }
      )
    }

    // If everything is successful, return the URL.
    return NextResponse.json(
      {
        message: 'Image uploaded successfully!',
        imageUrl: uploadResult.secure_url,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Upload API Error:', error)
    return NextResponse.json(
      { message: 'An internal server error occurred during upload.', error: error.message },
      { status: 500 }
    )
  }
}
