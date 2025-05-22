import cloudinary from '@/lib/cloudinary'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Optional: Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'branverse',
            resource_type: 'auto', // Auto-detect file type
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error)
              reject(NextResponse.json({ error: 'Upload failed' }, { status: 500 }))
            } else {
              resolve(
                NextResponse.json({
                  url: result.secure_url,
                  public_id: result.public_id,
                })
              )
            }
          }
        )
        .end(buffer)
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// If you actually need this GET endpoint
export function GET() {
  try {
    return NextResponse.json({ message: 'Endpoint ready for file uploads' }, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}
