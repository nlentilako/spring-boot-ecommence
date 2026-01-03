import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiPercent, FiClock, FiShoppingBag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { RootState } from '../store/store';
import { Product } from '../types';
import { setFeaturedProducts, setProducts } from '../store/productSlice';
import ProductCard from '../components/products/ProductCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { featured, products, loading } = useSelector((state: RootState) => state.products);

  // Mock data for demonstration - in a real app, this would come from API
  useEffect(() => {
    // Simulate API call to fetch featured products
    const mockFeaturedProducts: Product[] = [
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
    ];

    const mockProducts: Product[] = [
      ...mockFeaturedProducts,
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
        stock: 40,
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
    ];

    dispatch(setFeaturedProducts(mockFeaturedProducts));
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  // Mock banners
  const banners = [
    {
      id: 1,
      title: 'Summer Sale',
      subtitle: 'Up to 50% off on electronics',
      image: 'https://via.placeholder.com/1200x400',
      cta: 'Shop Now',
      url: '/products?category=electronics',
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'Latest fashion trends',
      image: 'https://via.placeholder.com/1200x400',
      cta: 'Discover',
      url: '/products?category=fashion',
    },
    {
      id: 3,
      title: 'Home Essentials',
      subtitle: 'Everything for your home',
      image: 'https://via.placeholder.com/1200x400',
      cta: 'Explore',
      url: '/products?category=home',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Discover Amazing Products
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-primary-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Shop the latest trends with unbeatable prices and fast delivery
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                to="/products" 
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Shop Now <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Banners */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <motion.div
                key={banner.id}
                className="relative rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{banner.title}</h3>
                  <p className="text-white/90 mb-4">{banner.subtitle}</p>
                  <Link 
                    to={banner.url}
                    className="text-white font-semibold inline-flex items-center"
                  >
                    {banner.cta} <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Books'].map((category, index) => (
              <motion.div
                key={category}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShoppingBag className="text-primary-600 text-2xl" />
                </div>
                <h3 className="font-semibold text-gray-800">{category}</h3>
                <p className="text-sm text-gray-500 mt-1">View products</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 font-semibold hover:underline flex items-center">
              View All <FiArrowRight className="ml-2" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                  <Skeleton height={200} className="mb-4" />
                  <Skeleton height={20} width="80%" className="mb-2" />
                  <Skeleton height={16} width="60%" className="mb-3" />
                  <Skeleton height={20} width="40%" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="py-12 bg-gradient-to-r from-warning-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Deals of the Day</h2>
            <div className="flex items-center text-gray-600">
              <FiClock className="mr-2" />
              <span>Ends in 12:34:56</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  {product.discountPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      <FiPercent className="inline mr-1" />
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-warning-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={i < Math.floor(product.rating) ? 'fill-current' : ''} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.discountPrice ? (
                        <div className="flex items-baseline">
                          <span className="text-lg font-bold text-primary-600">
                            ${product.discountPrice.toFixed(2)}
                          </span>
                          <span className="text-gray-500 line-through ml-2">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-primary-600">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Link 
                      to={`/products/${product.id}`} 
                      className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
                    >
                      Shop
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SmartShop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We source only the best products from trusted brands</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPercent className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices with regular discounts and offers</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;