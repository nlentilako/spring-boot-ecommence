import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiChevronLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <FiShoppingBag className="text-gray-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
            <Link 
              to="/products" 
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-primary-600 mr-6"
          >
            <FiChevronLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Your Cart ({itemCount} items)</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                            <p className="text-gray-600 mt-1">
                              ${item.discountPrice ? item.discountPrice.toFixed(2) : item.price.toFixed(2)}
                              {item.discountPrice && (
                                <span className="line-through text-gray-500 text-sm ml-2">
                                  ${item.price.toFixed(2)}
                                </span>
                              )}
                            </p>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.productId)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <FiX className="text-xl" />
                          </button>
                        </div>
                        
                        <div className="mt-4 flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <FiMinus />
                            </button>
                            <span className="px-4 py-2">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                              disabled={item.quantity >= item.stock}
                            >
                              <FiPlus />
                            </button>
                          </div>
                          
                          <div className="ml-6 text-lg font-semibold text-gray-800">
                            ${(item.discountPrice ? item.discountPrice : item.price) * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(total * 0.1).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(total + total * 0.1).toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>
              
              <button 
                onClick={() => navigate('/products')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;