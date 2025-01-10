import { notFound } from 'next/navigation'
import { Product } from '@/types/product'
import { ProductDetails } from '@/components/product-details'

async function getProduct(id: string): Promise<Product> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, { 
      cache: 'no-store',
      // Add proper error handling for non-200 responses
      next: { revalidate: 60 } // Revalidate every minute
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`)
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  // Await the params object
  const resolvedParams = await params
  
  try {
    const product = await getProduct(resolvedParams.id)
    
    if (!product) {
      notFound()
    }
    
    return <ProductDetails product={product} />
  } catch (error) {
    console.error('Error in ProductPage:', error)
    notFound()
  }
}