import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiHeart, FiShoppingCart, FiPercent } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Product } from '../../types';
import { addToCart } from '../../store/cartSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images[0],
      stock: product.stock,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden product-card group">
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {product.discountPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            <FiPercent className="inline mr-1" />
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )}
        
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <FiHeart className="text-gray-600" />
        </button>
        
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleAddToCart}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 flex items-center"
          >
            <FiShoppingCart className="mr-1" /> Add to Cart
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
        </div>
        
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
        
        <div className="flex items-center justify-between mb-3">
          <div>
            {product.discountPrice ? (
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-primary-600">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through ml-2 text-sm">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              product.stock === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            Add to Cart
          </button>
          <Link 
            to={`/products/${product.id}`} 
            className="p-2 border border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
          >
            <FiShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;