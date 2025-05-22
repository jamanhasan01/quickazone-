'use client'

import Link from 'next/link'
import { FaLock, FaShieldAlt, FaBoxOpen, FaPenFancy , FaExchangeAlt } from 'react-icons/fa'

export default function TermsPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20'>
      <div className='text-center mb-12'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center'>
          <FaPenFancy 
            className='mr-3 text-main
'
          />
          Terms & Conditions
        </h1>

        <p className='text-gray-600'>Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-xl font-semibold mb-4 flex items-center'>
          <FaLock className='mr-2 text-main' /> 1. Account Registration
        </h2>
        <p className='text-gray-700 mb-4'>
          By creating an account, you agree to provide accurate and complete information. You are
          responsible for maintaining the confidentiality of your account credentials.
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-xl font-semibold mb-4 flex items-center'>
          <FaBoxOpen
            className='mr-2 text-main
'
          />{' '}
          2. Orders & Payments
        </h2>
        <ul className='list-disc pl-5 space-y-2 text-gray-700'>
          <li>All prices are in USD and subject to change without notice</li>
          <li>We accept Visa, Mastercard, PayPal, and other major payment methods</li>
          <li>Orders are processed within 1-3 business days</li>
        </ul>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-xl font-semibold mb-4 flex items-center'>
          <FaExchangeAlt
            className='mr-2 text-main
'
          />{' '}
          3. Returns & Refunds
        </h2>
        <p className='text-gray-700 mb-2'>
          We offer 30-day returns for unused items in original packaging. To initiate a return:
        </p>
        <ol className='list-decimal pl-5 space-y-1 text-gray-700'>
          <li>Contact our support team within 30 days of delivery</li>
          <li>Include your order number and reason for return</li>
          <li>Ship items back to our warehouse</li>
        </ol>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-xl font-semibold mb-4 flex items-center'>
          <FaShieldAlt
            className='mr-2 text-main
'
          />{' '}
          Privacy Policy
        </h2>
        <div className='space-y-4 text-gray-700'>
          <p>
            We collect personal information (name, email, address) solely for order processing and
            improving your shopping experience. Your data is protected with SSL encryption and will
            never be sold to third parties.
          </p>
          <p>
            We use cookies to remember cart contents and analyze website traffic. You can disable
            cookies in your browser settings.
          </p>
          <p>
            For GDPR compliance, you may request access to or deletion of your personal data by
            contacting us at privacy@yourstore.com.
          </p>
        </div>
      </div>

      <div className='text-center mt-8'>
        <Link href='/register' className='button'>
          Back to Registration
        </Link>
      </div>
    </div>
  )
}
