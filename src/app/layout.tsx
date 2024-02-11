import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/common/Navbar'
import NextAuthProvider from '@/providers/nextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SH: The Productivity App',
  description: 'Significant Hobbies: Making you a better person everyday',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <main className="lg:flex min-h-screen flex-col items-center py-24">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  )
}
