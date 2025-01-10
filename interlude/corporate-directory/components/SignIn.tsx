'use client'

import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Directory</h1>
      <button
        onClick={() => signIn('google')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Sign in with Google
      </button>
    </div>
  )
}