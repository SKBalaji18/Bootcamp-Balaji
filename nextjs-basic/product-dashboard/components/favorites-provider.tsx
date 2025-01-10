'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/types/product'
import { useToast } from '@/hooks/use-toast'

type FavoritesContextType = {
  favorites: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (product: Product) => {
    setFavorites((prev) => [...prev, product])
    toast({
      title: 'Added to favorites',
      description: `${product.title} has been added to your favorites.`,
    })
  }

  const removeFavorite = (productId: number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId))
    toast({
      title: 'Removed from favorites',
      description: 'The product has been removed from your favorites.',
      variant: 'destructive',
    })
  }

  const isFavorite = (productId: number) => {
    return favorites.some((p) => p.id === productId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

