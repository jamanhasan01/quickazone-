'use client'
import Link from 'next/link'
import { signIn } from 'next-auth/react' 
import { useRouter } from 'next/navigation' 

const LoginPage = () => {
  const router = useRouter()

  let handleSubmit = async (e) => {
    e.preventDefault()
    let form = new FormData(e.target)
    let email = form.get('email')
    let password = form.get('password')


    const result = await signIn('credentials', {
      redirect: false, 
      email,
      password, 
    })

    if (result.error) {
      
      console.error("Login failed:", result.error)
      alert("Login failed: " + result.error);
    } else {
      
      console.log("Login successful!")
      
      router.push('/') 
    }
  }

  return (
    <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4'>
      {/* Glass Card Container */}
      <div className='w-full max-w-md bg-white/20 bg-transparent backdrop-blur-3xl rounded-xl shadow-2xl overflow-hidden border border-white/30'>
        {/* Decorative Light Effects */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-20 -left-20 w-64 h-64 bg-blue-200/30 rounded-full filter blur-2xl'></div>
          <div className='absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200/30 rounded-full filter blur-2xl'></div>
        </div>

        <div className='relative py-4 px-6 sm:px-7'>
          <div className='mb-8 text-center'>
            <h2 className='text-3xl font-bold text-gray-800'>Welcome back</h2>
            <p className='text-gray-600 mt-2'>Sign in to your account</p>
          </div>

          {/* form field start from here */}
          <form onSubmit={handleSubmit}>
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
                required // Added for basic HTML validation
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
                autoComplete='current-password'
                className='w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent placeholder-gray-500'
                placeholder='••••••••'
                required // Added for basic HTML validation
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/30 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a href='#' className='font-medium text-main'>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type='submit'
              className=' w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md cursor-pointer'
            >
              Login
            </button>
          </form>

          {/* Social Login Divider */}
          <div className='relative my-2'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-white/30'></div>
            </div>
            <div className='relative flex justify-center'>
              <span className='px-2 bg-transparent text-sm text-gray-600'>Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className='grid grid-cols-2 gap-3'>
            {/* Google */}
            <button
              type='button'
              className='flex items-center justify-center py-2 px-4 bg-white/50 border border-gray-200 rounded-lg hover:bg-white/70 transition cursor-pointer'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.13-2.676-6.735-2.676-5.523 0-10 4.477-10 10s4.477 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z' />
              </svg>
              <span className='ml-1 text-sm font-semibold text-gray-600'>Google</span>
            </button>

            {/* Facebook */}
            <button
              type='button'
              className='flex items-center justify-center py-2 px-4 bg-white/50 border border-gray-200 rounded-lg hover:bg-white/70 transition cursor-pointer'
            >
              <svg className='w-5 h-5' fill='#1877F2' viewBox='0 0 24 24'>
                <path d='M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.26c0-2.511 1.492-3.889 3.777-3.889 1.094 0 2.238.195 2.238.195v2.461h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.988c4.781-.75 8.438-4.887 8.438-9.877z' />
              </svg>{' '}
              <span className='ml-1 text-sm font-semibold text-gray-600'>Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className='mt-2 text-center'>
            <p className='text-sm text-gray-600'>
            <p>{"Don't have an account?"}</p>
              <Link href={'/register'} className='font-medium text-main hover:underline'>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage