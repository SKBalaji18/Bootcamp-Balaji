'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useFavorites } from '@/components/favorites-provider'

export function ProductCard({ product }: { product: Product }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(product.id)

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(product.id)
    } else {
      addFavorite(product)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="truncate">{product.title}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={favorite ? 'fill-current text-red-500' : ''} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

