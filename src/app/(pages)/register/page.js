'use client'
import Link from 'next/link'
import { useState } from 'react'

const RegisterPage = () => {
  const [error, setError] = useState({})
  const [uploadImg, setuploadImg] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()

    let newError = {}

    let form = new FormData(e.target)
    let fullname = form.get('name')
    let email = form.get('email')
    let password = form.get('password')
    let confirm_passowrd = form.get('confirm-password')
    let termsAccepted = form.get('terms') == 'on'
    let file = form.get('file')

    // image upload logic
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    let image = await res.json()

    // validation check

    if (!fullname) newError.fullname = 'Full name is required'
    if (!email) newError.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newError.email = 'Invalid email format'
    if (!confirm_passowrd) newError.confirm_passowrd = 'confirm password is required'
    if (password.length < 8) newError.password = 'password must be at least 8 characters '
    if (password !== confirm_passowrd) newError.confirm_passowrd = 'passowrds do not match'
    if (!termsAccepted) newError.termsAccepted = 'You have to accept our terms and policies.'
    if (!image || !uploadImg) newError.imageErr = 'i have to upload an image'
    if (Object.keys(newError).length > 0) {
      setError(newError)
      return
    }

    // registration_Object
    let registration = { fullname, email, password, confirm_passowrd, photoURL: image.url }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registration),
      })

      const data = await response.json()
      if (response.ok) {
        alert('User registered successfully!')
      } else {
        alert(data.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
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

          {/* register form */}
          <form className='' onSubmit={submitHandler}>
            {/* row number 1 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {/* Name Field */}
              <div className='mb-3'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                  Full Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  className={`w-full px-4 py-3 bg-white/50 border ${
                    error.fullname ? 'border-red-600' : 'border-white/30'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500`}
                  placeholder='John Doe'
                />
                <p className='text-xs text-red-500 mt-1'>{error.fullname}</p>
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
                  className={`w-full px-4 py-3 bg-white/50 border ${
                    error.email ? 'border-red-600' : 'border-white/30'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500`}
                  placeholder='your@email.com'
                />
                <p className='text-xs text-red-500 mt-1'>{error.email}</p>
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
                  className={`w-full px-4 py-3 bg-white/50 border ${
                    error.password ? 'border-red-600' : 'border-white/30'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500`}
                  placeholder='••••••••'
                />
                <p className='text-xs text-red-500 mt-1'>{error.password || error.passwordReq}</p>
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
                  className={`w-full px-4 py-3 bg-white/50 border ${
                    error.confirm_passowrd ? 'border-red-600' : 'border-white/30'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500`}
                  placeholder='••••••••'
                />
                <p className='text-xs text-red-500 mt-1'>{error.confirm_passowrd}</p>
              </div>
            </div>
            <div className='relative w-full flex items-center gap-2  rounded-md'>
              <label
                htmlFor='fileInput'
                className='cursor-pointer bg-main text-white py-2 px-4 rounded-md'
              >
                Upload File
              </label>
              <input
                type='file'
                name='file'
                id='fileInput'
                className='absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer'
                onChange={(e) => setuploadImg(e.target.files[0].name)}
              />
              <p>
                {uploadImg ? (
                  uploadImg
                ) : (
                  <span className='text-sm text-red-600'>{error.imageErr}</span>
                )}
              </p>
            </div>
            {/* Terms and Conditions */}
            <div className='my-4'>
              <div className='flex items-center'>
                <input
                  id='terms'
                  name='terms'
                  type='checkbox'
                  className={'h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/30 rounded'}
                />
                <label htmlFor='terms' className='ml-2 block text-sm text-gray-700'>
                  I agree to the{' '}
                  <Link href='/trams' className='text-main hover:underline'>
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href='policy' className='text-main hover:underline'>
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <p className='text-xs text-red-500 mt-1'>{error.termsAccepted}</p>
            </div>

            {/* Sign Up Button */}
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md cursor-pointer'
            >
              Create Account
            </button>
          </form>
          {/* Sign In Link */}
          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link href={'/login'} className='font-medium text-main hover:underline'>
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
