import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Huntaze - Be the next big thing',
  description: 'The AI platform that automates your creator business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}