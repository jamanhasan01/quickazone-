// components/Header.js
'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Test() {
  const { data: session, status } = useSession()


  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <Link href="/">Home</Link>
      <nav>
        {status === 'authenticated' ? (
          <>
            <span style={{ marginRight: '1rem' }}>
              Welcome, {session.user.name} ({session.user.email})
            </span>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </nav>
    </header>
  )
}