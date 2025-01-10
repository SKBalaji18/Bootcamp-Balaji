'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function GreetingForm() {
  const [username, setUsername] = useState('')
  const [greeting, setGreeting] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnimating(true)
    setGreeting('') // Clear existing greeting for re-animation

    // Artificial delay for animation smoothness
    await new Promise(resolve => setTimeout(resolve, 100))
    setGreeting(`Hello ${username} !!`)
  }

  const handleClear = () => {
    setGreeting('')
    setUsername('')
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Input Card */}
      <Card className="border-none bg-secondary/50 transition-all duration-300 hover:shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-12 bg-background/50 border-2 border-muted px-4 text-base transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {username && (
                <span className="absolute right-3 top-3 animate-pulse">
                  <Sparkles className="h-5 w-5 text-primary/50" />
                </span>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Generate Greeting
            </Button>
            <Button 
              type="button" 
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleClear}
            >
              Clear
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Result Card */}
      <div className={`relative transition-all duration-500 ${greeting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {greeting && (
          <Card className="border-none bg-secondary/50 overflow-hidden">
            <CardContent className="pt-6 relative">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-gradient" />
              
              {/* Sparkles animation */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 animate-float">
                <Sparkles className="h-6 w-6 text-primary/50" />
              </div>
              
              <p className="text-center text-2xl font-serif italic relative z-10 animate-slideUp">
                {greeting}
              </p>
              
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/20 animate-fadeIn" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 animate-fadeIn" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/20 animate-fadeIn" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/20 animate-fadeIn" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}