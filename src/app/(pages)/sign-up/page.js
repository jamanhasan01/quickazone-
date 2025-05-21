'use client'

import Link from 'next/link'

const SignUpPage = () => {
  return (
    <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4'>
      {/* Glass Card Container */}
      <div className='w-full max-w-md bg-white/20 bg-transparent backdrop-blur-3xl rounded-xl shadow-2xl overflow-hidden border border-white/30'>
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

          {/* Name Field */}
          <div className='mb-3'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
              Full Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              className='w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500'
              placeholder='John Doe'
            />
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
              className='w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500'
              placeholder='your@email.com'
            />
          </div>

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
              className='w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500'
              placeholder='••••••••'
            />
            <p className='text-xs text-gray-500 mt-1'>
              Minimum 8 characters with at least one number
            </p>
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
              className='w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500'
              placeholder='••••••••'
            />
          </div>

          {/* Terms and Conditions */}
          <div className='flex items-center mb-6'>
            <input
              id='terms'
              name='terms'
              type='checkbox'
              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/30 rounded'
            />
            <label htmlFor='terms' className='ml-2 block text-sm text-gray-700'>
              I agree to the{' '}
              <a href='#' className='text-main hover:underline'>
                Terms
              </a>{' '}
              and{' '}
              <a href='#' className='text-main hover:underline'>
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md cursor-pointer'
          >
            Create Account
          </button>

          {/* Sign In Link */}
          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link href={'/sign-in'} className='font-medium text-main hover:underline'>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage
