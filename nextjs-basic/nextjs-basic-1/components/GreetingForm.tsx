'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function GreetingForm() {
  const [username, setUsername] = useState('')
  const [greeting, setGreeting] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGreeting(`Hello ${username}`)
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <Card className="p-6 bg-white/90 card-shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-white text-gray-800 border-2 border-[hsl(var(--button-gradient-start)/_0.3)]"
          />
          <Button type="submit" className="w-full gradient-button text-white font-semibold">
            Submit
          </Button>
        </form>
      </Card>
      {greeting && (
        <Card className="p-6 bg-white/90 card-shadow">
          <p className="text-center result-text">{greeting}</p>
        </Card>
      )}
    </div>
  )
}

