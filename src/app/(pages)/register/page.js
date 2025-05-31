'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const [uploadImg, setuploadImg] = useState(null)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false) // New state for loading indicator
  const router = useRouter()
  const submitHandler = async (e) => {
    e.preventDefault()
    setErrors({}) // Clear previous errors
    setMessage('') // Clear previous messages
    setIsUploading(true) // Start loading indicator

    const form = new FormData(e.target) // Get all form data initially

    // Extract values for client-side validation
    const fullname = form.get('name')
    const email = form.get('email')
    const password = form.get('password')
    const confirm_password = form.get('confirm-password')
    const termsAccepted = form.get('terms') === 'on'
    const file = form.get('file') // Get the File object

    // Client-side validation: Password confirmation
    if (password !== confirm_password) {
      setErrors((prev) => ({ ...prev, confirm_password: 'Passwords do not match.' }))
      setIsUploading(false)
      return
    }

    // Client-side validation: Check if a file is selected
    if (!file || file.size === 0) {
      setErrors((prev) => ({ ...prev, photoURL: 'Please select a profile picture.' }))
      setIsUploading(false)
      return
    }

    // Client-side validation: Terms acceptance
    if (!termsAccepted) {
      setErrors((prev) => ({
        ...prev,
        termsAccepted: 'You must accept the terms and privacy policy.',
      }))
      setIsUploading(false)
      return
    }

    let photoURL = null

    try {
      // --- STEP 1: Upload the image to /api/upload ---
      const uploadFormData = new FormData()
      uploadFormData.append('file', file) // Append only the file to a new FormData object

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        // DO NOT set 'Content-Type' here; browser will set multipart/form-data
        body: uploadFormData, // Send the FormData with the file
      })

      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) {
        // Handle upload errors
        setErrors((prev) => ({ ...prev, photoURL: uploadData.message || 'Image upload failed.' }))
        setIsUploading(false)
        return // Stop if image upload fails
      }

      photoURL = uploadData.imageUrl // Get the URL from the upload response
    } catch (uploadError) {
      console.error('Image upload client-side/network error:', uploadError)
      setMessage('Failed to upload image. Please try again.')
      setIsUploading(false)
      return
    }

    // --- STEP 2: Register the user with the received photoURL ---
    const userData = {
      fullname,
      email,
      password,
      termsAccepted,
      photoURL, // Include the Cloudinary URL here
    }

    try {
      const registerRes = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData), // Send user data as JSON
      })

      const registerData = await registerRes.json()
      console.log('Register API Response Data:', registerData)

      if (!registerRes.ok) {
        if (registerData.errors) {
          setErrors(registerData.errors)
        } else if (registerData.message) {
          setMessage(registerData.message)
        } else {
          setMessage('An unknown error occurred during registration.')
        }
      } else {
        setMessage(registerData.message || 'Registration successful! Redirecting...')
        e.target.reset() // Resets the form fields
        setuploadImg(null) // Clear the displayed uploaded image name
        // Optionally, redirect the user after a short delay

        setTimeout(() => {
          router.push('/login')
        }, 1000)
      }
    } catch (registerError) {
      console.error('Registration client-side/network error:', registerError)
      setMessage('Failed to register user. Please try again.')
    } finally {
      setIsUploading(false) // End loading indicator
    }
  }

  return (
    <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4'>
      {/* Glass Card Container */}
      <div
        className={`w-full max-w-xl bg-white/20 bg-transparent backdrop-blur-3xl rounded-xl shadow-2xl overflow-hidden border border-white/30`}
      >
        {/* Decorative Light Effects */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-20 -left-20 w-64 h-64 bg-blue-200/30 rounded-full filter blur-2xl'></div>
          <div className='absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200/30 rounded-full filter blur-2xl'></div>
        </div>

        <div className='relative py-6 px-6 sm:px-8'>
          <div className='mb-6 text-center'>
            <h2 className='text-3xl font-bold text-gray-800'>Create your account</h2>
            <p className='text-gray-600 mt-2'>Join our e-commerce community</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={submitHandler}>
            {/* General message display (for success or overall errors) */}
            {message && (
              <div
                className={`mb-4 p-3 rounded-md text-center ${
                  message.includes('successful')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            {/* row number 1 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {/* Name Field */}
              <div className='mb-3'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                  Full Name
                </label>
                <input
                  id='name'
                  name='name' // This name will be 'fullname' in Mongoose if your schema uses 'fullname'
                  type='text'
                  className={`w-full px-4 py-3 bg-white/50 border
                    ${errors.fullname ? 'border-red-500' : 'border-white/30'}
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500`}
                  placeholder='John Doe'
                />
                {errors.fullname && (
                  <p className='text-red-500 text-xs italic mt-1'>{errors.fullname}</p>
                )}
              </div>

              {/* Email Field */}
              <div className='mb-3'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                  Email address
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className={`w-full px-4 py-3 bg-white/50 border
                    ${errors.email ? 'border-red-500' : 'border-white/30'}
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500`}
                  placeholder='your@email.com'
                />
                {errors.email && <p className='text-red-500 text-xs italic mt-1'>{errors.email}</p>}
              </div>
            </div>

            {/* row number 2 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {/* Password Field */}
              <div className='mb-3'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='new-password'
                  className={`w-full px-4 py-3 bg-white/50 border
                    ${errors.password ? 'border-red-500' : 'border-white/30'}
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500`}
                  placeholder='••••••••'
                />
                {errors.password && (
                  <p className='text-red-500 text-xs italic mt-1'>{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className='mb-4'>
                <label
                  htmlFor='confirm-password'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Confirm Password
                </label>
                <input
                  id='confirm-password'
                  name='confirm-password'
                  type='password'
                  autoComplete='new-password'
                  className={`w-full px-4 py-3 bg-white/50 border
                    ${errors.confirm_password ? 'border-red-500' : 'border-white/30'}
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500`}
                  placeholder='••••••••'
                />
                {errors.confirm_password && (
                  <p className='text-red-500 text-xs italic mt-1'>{errors.confirm_password}</p>
                )}
              </div>
            </div>

            {/* File Upload Section */}
            <div className='relative w-full flex items-center gap-2 rounded-md mb-4'>
              <label
                htmlFor='fileInput'
                className='cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200'
              >
                Upload Photo
              </label>
              <input
                type='file'
                name='file' // This 'name' attribute is crucial for formData.get('file')
                id='fileInput'
                className='absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer'
                onChange={(e) => setuploadImg(e.target.files[0]?.name || null)} // Handle case where no file is selected
              />
              <div>
                <p className='text-gray-600 text-sm italic'>{uploadImg || 'No file chosen'}</p>
                {/* Changed 'file' to 'photoURL' to match Mongoose schema field and backend error key */}
                {errors.photoURL && (
                  <p className='text-red-500 text-xs italic mt-1'>{errors.photoURL}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className='my-4'>
              <div className='flex items-center'>
                <input
                  id='terms'
                  name='terms'
                  type='checkbox'
                  className={`h-4 w-4 text-blue-600 focus:ring-blue-500 rounded
                    ${errors.termsAccepted ? 'border-red-500' : 'border-white/30'}`}
                />
                <label htmlFor='terms' className='ml-2 block text-sm text-gray-700'>
                  I agree to the{' '}
                  <Link href='/trams' className='text-blue-600 hover:underline'>
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href='/policy' className='text-blue-600 hover:underline'>
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.termsAccepted && (
                <p className='text-red-500 text-xs italic mt-1'>{errors.termsAccepted}</p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md cursor-pointer'
              disabled={isUploading}
            >
              {isUploading ? (
                <span className='loading loading-spinner loading-sm'></span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link href={'/login'} className='font-medium text-blue-600 hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
