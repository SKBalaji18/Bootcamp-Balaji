'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/components/favorites-provider'

export function ProductDetails({ product }: { product: Product }) {
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
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 aspect-square relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        <Button
          onClick={handleFavoriteClick}
          variant={favorite ? 'destructive' : 'default'}
        >
          <Heart className="mr-2 h-4 w-4" />
          {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </div>
    </div>
  )
}

