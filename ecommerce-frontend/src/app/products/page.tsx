'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 199.99,
    image: '/api/placeholder/300/300',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    image: '/api/placeholder/300/300',
    description: 'Feature-rich smartwatch with health monitoring',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 129.99,
    image: '/api/placeholder/300/300',
    description: 'Comfortable running shoes for all terrains',
    category: 'Footwear',
    inStock: false
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{product.category}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <Link 
                    href={`/products/${product.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}