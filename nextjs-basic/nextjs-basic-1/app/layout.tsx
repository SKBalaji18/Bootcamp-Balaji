import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Greeting App',
  description: 'A simple greeting application built with Next.js and ShadCN',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} gradient-background min-h-screen`} suppressHydrationWarning>{children}</body>
    </html>
  )
}
