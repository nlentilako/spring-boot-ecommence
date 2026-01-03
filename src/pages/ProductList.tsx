import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiGrid, FiList, FiSliders, FiStar, FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Product } from '../types';
import ProductCard from '../components/products/ProductCard';
import Skeleton from 'react-loading-skeleton';

const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.products);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Get category from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would come from an API call
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 129.99,
        discountPrice: 99.99,
        category: 'Electronics',
        images: ['https://via.placeholder.com/300x300'],
        rating: 4.5,
        reviewCount: 120,
        stock: 50,
        brand: 'TechBrand',
        specifications: { 
          'Battery Life': '30 hours',
          'Connectivity': 'Bluetooth 5.0',
          'Color': 'Black'
        },
        tags: ['wireless', 'audio', 'gadgets'],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
      {
        id: '2',
        name: 'Smart Fitness Watch',
        description: 'Track your health and fitness with this advanced smartwatch',
        price: 199.99,
        discountPrice: 149.99,
        category: 'Electronics',
        images: ['https://via.placeholder.com/300x300'],
        rating: 4.7,
        reviewCount: 89,
        stock: 30,
        brand: 'FitTech',
        specifications: { 
          'Display': '1.4" AMOLED',
          'Battery': '7 days',
          'Waterproof': 'Yes'
        },
        tags: ['fitness', 'smartwatch', 'health'],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
      {
        id: '3',
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable and eco-friendly cotton t-shirt',
        price: 29.99,
        category: 'Fashion',
        images: ['https://via.placeholder.com/300x300'],
        rating: 4.3,
        reviewCount: 65,
        stock: 100,
        brand: 'EcoWear',
        specifications: { 
          'Material': '100% Organic Cotton',
          'Sizes': 'S, M, L, XL',
          'Color': 'White'
        },
        tags: ['organic', 'cotton', 'fashion'],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
      {
        id: '4',
        name: 'Stainless Steel Cookware Set',
        description: 'Complete cookware set for your kitchen',
        price: 149.99,
        discountPrice: 119.99,
        category: 'Home & Kitchen',
        images: ['https://via.placeholder.com/300x300'],
        rating: 4.6,
        reviewCount: 210,
        stock: 25,
        brand: 'KitchenPro',
        specifications: { 
          'Pieces': '10-piece set',
          'Material': 'Stainless Steel',
          'Warranty': 'Lifetime'
        },
        tags: ['cookware', 'kitchen', 'stainless'],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
      {
        id: '5',
        name: 'Wireless Charging Pad',
        description: 'Fast wireless charging for your devices',
        price: 39.99,
        category: 'Electronics',
        images: ['https://via.placeholder.com/300x300'],
        rating: 4.2,
        reviewCount: 45,
        stock: 75,
        brand: 'ChargeTech',
        specifications: { 
          'Power': '15W Fast Charging',
          'Compatibility': 'All Qi-enabled devices',
          'Color': 'Black'
        },
        tags: ['charging', 'wireless', 'accessories'],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
      {
        id: '6',
        name: 'Leather Wallet',
        description: 'Genuine leather wallet with multiple compartments',
        price: 49.99,
        discountPrice: 39.99,
        category: 'Fashion',
        images: ['https://via.placeholder.com/300x300'],
        rating: 4.4,
        reviewCount: 87,
        stock: 0,
        brand: 'LeatherCraft',
        specifications: { 
          'Material': 'Genuine Leather',
          'Compartments': '8 slots',
          'Color': 'Brown'
        },
        tags: ['leather', 'wallet', 'accessories'],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
      {
        id: '7',
        name: 'Bluetooth Speaker',
        description: 'Portable speaker with excellent sound quality',
        price: 79.99,
        discountPrice: 59.99,
        category: 'Electronics',
        images: ['https://via.placeholder.com/300x300'],
        rating: 4.1,
        reviewCount: 92,
        stock: 40,
        brand: 'SoundPro',
        specifications: { 
          'Battery': '12 hours',
          'Waterproof': 'IPX7',
          'Color': 'Blue'
        },
        tags: ['speaker', 'audio', 'portable'],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
      {
        id: '8',
        name: 'Coffee Maker',
        description: 'Automatic coffee maker for perfect coffee every time',
        price: 89.99,
        category: 'Home & Kitchen',
        images: ['https://via.placeholder.com/300x300'],
        rating: 4.8,
        reviewCount: 156,
        stock: 15,
        brand: 'CoffeeMaster',
        specifications: { 
          'Capacity': '12 cups',
          'Features': 'Programmable',
          'Color': 'Black'
        },
        tags: ['coffee', 'kitchen', 'appliance'],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
    ];
    
    // In a real app, dispatch an action to set products
  }, [dispatch]);

  // Filter products based on criteria
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Rating filter
    if (product.rating < minRating) {
      return false;
    }
    
    // In stock filter
    if (inStockOnly && product.stock === 0) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case 'price-high':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0; // relevance would be handled by API
    }
  });

  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Books'];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Hidden on mobile unless toggled */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <FiX />
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.checked ? category : null)}
                        className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor={category} className="ml-2 text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Price Range</h3>
                <div className="px-1">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Minimum Rating</h3>
                <div className="flex items-center space-x-1">
                  {[4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                      className={`flex items-center px-3 py-1 rounded-full text-sm ${
                        minRating === rating 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FiStar className="fill-current mr-1" />
                      {rating}+
                    </button>
                  ))}
                </div>
              </div>
              
              {/* In Stock Filter */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="inStock" className="ml-2 text-gray-700">
                    In Stock Only
                  </label>
                </div>
              </div>
              
              <button 
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                onClick={() => {
                  setSelectedCategory(null);
                  setPriceRange([0, 1000]);
                  setMinRating(0);
                  setInStockOnly(false);
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {selectedCategory ? selectedCategory : 'All Products'}
                  </h1>
                  <p className="text-gray-600">
                    {sortedProducts.length} products found
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Sort By */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="relevance">Sort by: Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                      <option value="name">Name: A to Z</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  
                  {/* View Toggle */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      <FiGrid />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      <FiList />
                    </button>
                  </div>
                  
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <FiFilter className="mr-2" /> Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products Grid/List */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                    <Skeleton height={200} className="mb-4" />
                    <Skeleton height={20} width="80%" className="mb-2" />
                    <Skeleton height={16} width="60%" className="mb-3" />
                    <Skeleton height={20} width="40%" />
                  </div>
                ))}
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-6'
              }>
                {sortedProducts.map(product => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
            
            {/* No Products Message */}
            {!loading && sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FiGrid className="mx-auto h-16 w-16" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for</p>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 1000]);
                    setMinRating(0);
                    setInStockOnly(false);
                  }}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {!loading && sortedProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-primary-600 text-white">1</button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;