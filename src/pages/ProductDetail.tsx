import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiHeart, FiShoppingCart, FiShare2, FiChevronLeft, FiChevronRight, FiX, FiMinus, FiPlus, FiPercent } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Product } from '../types';
import { addToCart } from '../store/cartSlice';
import ProductCard from '../components/products/ProductCard';
import Skeleton from 'react-loading-skeleton';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.products);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [showSimilarProducts, setShowSimilarProducts] = useState(false);
  
  const product = products.find(p => p.id === id) || null;
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    if (!product && !loading) {
      // In a real app, this would come from an API call
      const mockProduct: Product = {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation. Experience crystal clear audio with our premium sound technology. Perfect for music lovers, gamers, and professionals.',
        price: 129.99,
        discountPrice: 99.99,
        category: 'Electronics',
        images: [
          'https://via.placeholder.com/600x600',
          'https://via.placeholder.com/600x600',
          'https://via.placeholder.com/600x600',
          'https://via.placeholder.com/600x600'
        ],
        rating: 4.5,
        reviewCount: 120,
        stock: 50,
        brand: 'TechBrand',
        specifications: { 
          'Battery Life': '30 hours',
          'Connectivity': 'Bluetooth 5.0',
          'Color': 'Black',
          'Weight': '250g',
          'Warranty': '2 years'
        },
        tags: ['wireless', 'audio', 'gadgets'],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      };
      
      // Set the mock product in the store
      // In a real app, we would dispatch an action to fetch the product
    }
  }, [product, loading]);

  // Set related products
  useEffect(() => {
    if (product) {
      // In a real app, this would come from an API call
      const mockRelatedProducts: Product[] = [
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
          id: '4',
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
      ];
      
      setRelatedProducts(mockRelatedProducts);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.images[0],
        stock: product.stock,
      }));
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-primary-600 mb-6"
            >
              <FiChevronLeft className="mr-2" /> Back to products
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Skeleton height={500} className="mb-4" />
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} height={100} />
                  ))}
                </div>
              </div>
              
              <div>
                <Skeleton height={30} width="80%" className="mb-4" />
                <Skeleton height={20} width="40%" className="mb-6" />
                
                <div className="flex items-center mb-4">
                  <div className="flex text-warning-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">(120 reviews)</span>
                </div>
                
                <div className="flex items-baseline mb-6">
                  <Skeleton height={24} width="20%" className="mr-3" />
                  <Skeleton height={20} width="15%" />
                </div>
                
                <Skeleton height={100} className="mb-6" />
                
                <div className="flex space-x-4 mb-6">
                  <Skeleton height={40} width="45%" />
                  <Skeleton height={40} width="45%" />
                </div>
                
                <Skeleton height={50} className="mb-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button 
            onClick={() => navigate('/products')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-primary-600 mb-6"
          >
            <FiChevronLeft className="mr-2" /> Back to products
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4 relative">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-96 object-contain rounded-lg"
                />
                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                    <FiPercent className="inline mr-1" />
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border rounded-lg overflow-hidden ${
                      selectedImage === index ? 'border-primary-600 ring-2 ring-primary-300' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-warning-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={i < Math.floor(product.rating) ? 'fill-current' : ''} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">({product.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-baseline mb-6">
                {product.discountPrice ? (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-primary-600">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through ml-3">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary-600">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="text-gray-600 w-32">{key}:</span>
                      <span className="text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 0 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 10 
                    ? 'In Stock' 
                    : product.stock > 0 
                      ? `Only ${product.stock} left` 
                      : 'Out of Stock'}
                </span>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="text-gray-700 mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-2 disabled:opacity-50"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    disabled={product.stock === 0 || quantity >= product.stock}
                    className="p-2 disabled:opacity-50"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center ${
                    product.stock === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <FiShoppingCart className="mr-2" /> Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center ${
                    product.stock === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-secondary-600 text-white hover:bg-secondary-700'
                  }`}
                >
                  Buy Now
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-primary-600">
                  <FiHeart className="mr-2" /> Add to Wishlist
                </button>
                <button className="flex items-center text-gray-600 hover:text-primary-600">
                  <FiShare2 className="mr-2" /> Share
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-12 border-t pt-8">
            <div className="flex border-b mb-6">
              <button className="px-4 py-2 font-medium text-primary-600 border-b-2 border-primary-600">
                Description
              </button>
              <button className="px-4 py-2 font-medium text-gray-600 hover:text-primary-600">
                Reviews (120)
              </button>
              <button className="px-4 py-2 font-medium text-gray-600 hover:text-primary-600">
                Specifications
              </button>
            </div>
            
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 mb-4">
                {product.description} This premium product features advanced technology that delivers exceptional performance. 
                Whether you're a professional or a casual user, this product will exceed your expectations.
              </p>
              <p className="text-gray-700">
                With its sleek design and durable construction, this product is built to last. 
                It comes with a comprehensive warranty and excellent customer support.
              </p>
            </div>
          </div>
        </div>
        
        {/* Frequently Bought Together */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Frequently Bought Together</h2>
            <button 
              onClick={() => setShowSimilarProducts(!showSimilarProducts)}
              className="text-primary-600 hover:underline flex items-center"
            >
              {showSimilarProducts ? 'Hide' : 'Show'} Products <FiChevronRight className={`ml-1 ${showSimilarProducts ? 'rotate-90' : ''}`} />
            </button>
          </div>
          
          {showSimilarProducts && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          )}
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;