'use client'

import Link from 'next/link'
import { FaShieldAlt, FaUserLock, FaCookieBite, FaEnvelope } from 'react-icons/fa'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 mt-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <FaShieldAlt className="mr-3 text-main
" />
          Privacy Policy
        </h1>
        <p className="text-gray-600">Effective: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-700">
            At Qunicazone, we respect your privacy and are committed to protecting your personal data. 
            This policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>
        </section>

        {/* Data Collection */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUserLock className="mr-2 text-main
" />
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><strong>Personal Data:</strong> Name, email, shipping/billing address, phone number</li>
            <li><strong>Payment Information:</strong> Credit card details (processed securely via Stripe/PayPal)</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
            <li><strong>Usage Data:</strong> Pages visited, products viewed, cart activity</li>
          </ul>
        </section>

        {/* How We Use Data */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h3 className="font-medium mb-1">Order Processing</h3>
              <p>To fulfill and ship your purchases</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Customer Service</h3>
              <p>To respond to inquiries and requests</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Improvements</h3>
              <p>To enhance our website and products</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Marketing</h3>
              <p>To send promotional emails (you can unsubscribe anytime)</p>
            </div>
          </div>
        </section>

        {/* Cookies */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCookieBite className="mr-2 text-main
" />
            3. Cookies & Tracking
          </h2>
          <p className="text-gray-700 mb-3">
            We use cookies to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Remember your cart contents</li>
            <li>Analyze website traffic via Google Analytics</li>
            <li>Personalize your experience</li>
          </ul>
          <p className="text-gray-700 mt-3">
            You can disable cookies in your browser settings, but some website features may not function properly.
          </p>
        </section>

        {/* Data Sharing */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">4. Data Sharing</h2>
          <p className="text-gray-700 mb-2">
            We only share your data with:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Payment processors (Stripe, PayPal) to complete transactions</li>
            <li>Shipping carriers (FedEx, UPS) for order delivery</li>
            <li>Legal authorities if required by law</li>
          </ul>
          <p className="text-gray-700 mt-3 font-medium">
            We NEVER sell your personal data to third parties.
          </p>
        </section>

        {/* User Rights */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h3 className="font-medium mb-1">Access</h3>
              <p>Request a copy of your personal data</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Correction</h3>
              <p>Update inaccurate information</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Deletion</h3>
              <p>Request erasure of your data</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Opt-Out</h3>
              <p>Unsubscribe from marketing emails</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaEnvelope className="mr-2 text-main
" />
            6. Contact Us
          </h2>
          <p className="text-gray-700">
            For privacy-related questions or to exercise your rights, email us at:<br />
            <a href="mailto:privacy@yourstore.com" className="text-main
 hover:underline">
             jamanhasan246@gmail.com
            </a>
          </p>
          <p className="text-gray-700 mt-2">
            We may update this policy periodically. Please check back for changes.
          </p>
        
        </section>
           <div className="text-center mt-8">
        <Link href="/register" className="button">
          Back to Registration
        </Link>
      </div>
      </div>
    </div>
  )
}