import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import NextAuthProvider from '@/provider/NextAuthProvider'
import AuthHandler from '@/components/AuthHandler'
import NextAppProvider from '@/provider/NextAppProvider'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Quickazone ',
  description: 'E-Commerce website',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='light'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProvider>
          <AuthHandler>
            <NextAppProvider>
              <header>
                <Navbar />
              </header>
              <main>{children}</main>
              <footer></footer>
            </NextAppProvider>
          </AuthHandler>
        </NextAuthProvider>
      </body>
    </html>
  )
}
