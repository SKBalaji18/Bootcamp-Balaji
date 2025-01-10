'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useFavorites } from '@/components/favorites-provider'

export function Navbar() {
  const pathname = usePathname()
  const { favorites } = useFavorites()

  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-xl">
          Product Dashboard
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant={pathname === '/products' ? 'default' : 'ghost'}
            asChild
          >
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Products
            </Link>
          </Button>
          <Button
            variant={pathname === '/favorites' ? 'default' : 'ghost'}
            asChild
          >
            <Link href="/favorites">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
              {favorites.length > 0 && (
                <span className="ml-1 rounded-full bg-primary-foreground text-primary px-2 py-1 text-xs">
                  {favorites.length}
                </span>
              )}
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

