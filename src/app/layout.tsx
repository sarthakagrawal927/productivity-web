import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/common/Navbar'

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
        <Navbar />
        <main className="lg:flex min-h-screen flex-col py-24 px-20">
          {children}
        </main>
      </body>
    </html>
  )
}
