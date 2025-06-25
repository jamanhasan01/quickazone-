// lib/auth/auth.js
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginUser } from './loginUser'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const result = await loginUser(credentials.email, credentials.password)
        if (result.status === 'success') return result.user
        return null
      }
    })
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
      session.user.id = token.id
      session.user.name = token.name
      session.user.email = token.email
      session.user.image = token.image
      session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
}
