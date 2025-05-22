'use client'
import { useState } from 'react'

export default function ImageUploader({ setUrl, url, button_name }) {
  const [image, setImage] = useState(null)

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', image)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    console.log(image)

    console.log(formData)

    const data = await res.json()
    setUrl(data.url)
  }

  return (
    <>
      <div className='flex items-center gap-2'>
        <button
          disabled={!image}
          className='text-main opacity-100 hover:cursor-pointer disabled:opacity-60 disabled:hover:!cursor-not-allowed'
          onClick={handleUpload}
        >
          {button_name || 'Upload'}
        </button>
        <input type='file' className='' onChange={(e) => setImage(e.target.files[0])} />
      </div>
    </>
  )
}
