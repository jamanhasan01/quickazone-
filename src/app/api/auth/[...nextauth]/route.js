import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
            // Make sure this is your actual backend login endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const data = await res.json()
         

          // Check if the backend response indicates success and contains the user object
          if (res.ok && data.status === 'success' && data.user) {
            // IMPORTANT: Return the user object as it comes from your backend.
            // NextAuth will use this to populate the JWT token.
            // Your 'data.user' from the screenshot is perfect for this:
            // { _id: '665a2f583c1e57be8ae', fullname: 'Jaman', email: 'jaman@gmail.com', photoUrl: '...' }
            return data.user
          } else {
            // If authentication fails, return null
            console.error('Authentication failed:', data.message || 'Invalid credentials')
            return null
          }
        } catch (error) {
          console.error('Error during authentication:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only present on the first sign in (after authorize callback)
      if (user) {
        // Map the properties from your backend's user object to the JWT token
        token.id = user._id // Use _id from your backend response
        token.email = user.email
        token.name = user.fullname // Use fullname from your backend response
        token.image = user.photoUrl
      }
      return token
    },
    async session({ session, token }) {
      // The 'token' here is the one returned from the 'jwt' callback
      // Populate the session.user object with the data from the token
      if (token.id) {
        // Ensure token.id exists before assigning
        session.user.id = token.id
      }
      if (token.name) {
        session.user.name = token.name
      }
      if (token.email) {
        session.user.email = token.email
      }
      if (token.image) {
        session.user.image = token.image
      }
      return session
    },
  },
  pages: {
    signIn: '/login', // Specify your custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // IMPORTANT: Set this in your .env.local
}

const handler = NextAuth(authOptions)

// Export the handler for both GET and POST requests, as required by Next.js App Router for API routes
export { handler as GET, handler as POST }
