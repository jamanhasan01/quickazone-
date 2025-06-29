// /src/lib/auth/auth.js

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Import your custom login function
import { loginUser } from './loginUser' // Ensure this path is correct

// This is the main configuration for Auth.js v5
// It returns the handlers and the auth function we need
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Configure only the Credentials provider for email/password login
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign-in page.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        // Your custom loginUser function validates credentials against the database
        const result = await loginUser(credentials.email, credentials.password)

        if (result.status === 'success') {
          // On success, return the user object
          return result.user
        }
        // Return null if authentication fails, which will display an error to the user
        return null
      },
    }),
  ],

  // Using JWT for session strategy is required for credentials provider
  session: {
    strategy: 'jwt',
  },

  // Callbacks are used to control what happens during authentication actions
  callbacks: {
    // This callback enriches the JWT with more user information
    async jwt({ token, user }) {
      // On successful sign-in (the 'user' object is available), add custom properties to the token
      if (user) {
        token.id = user._id // from your loginUser function
        token.role = user.role
        token.name = user.fullname
        token.image = user.photoURL
      }
      return token
    },
    // This callback enriches the session object with data from the JWT
    async session({ session, token }) {
      // Add the custom properties from the token to the session.user object
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.name = token.name
        session.user.image = token.image
      }
      return session
    },
  },

  // Specify custom pages
  pages: {
    signIn: '/login', // Redirects users to your custom login page
  },

  // A secret is required for JWT encryption
  secret: process.env.NEXTAUTH_SECRET,
})
