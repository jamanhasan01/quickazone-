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
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
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

          if (res.ok && data.status === 'success' && data.user) {
            return data.user
          } else {
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
      if (user) {
        token.id = user._id
        token.email = user.email
        token.name = user.fullname
        token.image = user.photoURL
        token.role = user.role
      }

      return token
    },
    async session({ session, token }) {
      if (token.id) {
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
      if (token.role) {
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
