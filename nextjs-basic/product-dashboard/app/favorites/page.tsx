'use client'

import { useState, useEffect } from 'react'
import { useFavorites } from '@/components/favorites-provider'
import { ProductCard } from '@/components/product-card'
import SearchWithSuggestions from '@/components/search-with-suggestions'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const [filteredFavorites, setFilteredFavorites] = useState(favorites)

  const handleSearch = (searchTerm: string) => {
    setFilteredFavorites(
      favorites.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  useEffect(() => {
    setFilteredFavorites(favorites)
  }, [favorites])

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      <SearchWithSuggestions
        products={favorites}
        onSearch={handleSearch}
        className="mb-6"
      />
      {filteredFavorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}