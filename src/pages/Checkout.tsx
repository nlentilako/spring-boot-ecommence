import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiUser, FiCreditCard, FiShield, FiCheck, FiChevronLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, total } = useSelector((state: RootState) => state.cart);
  
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // In a real app, this would send the order to the backend
    // For now, we'll just navigate to a success page
    navigate('/order-success');
  };

  const subtotal = total;
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const orderTotal = subtotal + tax + shipping;

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
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              {/* Progress Steps */}
              <div className="flex items-center mb-8">
                <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="font-medium">Address</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
                <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="font-medium">Payment</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
                <div className={`flex items-center ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="font-medium">Review</span>
                </div>
              </div>
              
              {/* Step 1: Address */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FiMapPin className="mr-2" /> Shipping Address
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingAddress.firstName}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingAddress.lastName}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={shippingAddress.street}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Lagos"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Lagos"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="100001"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Country</label>
                      <select
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+234 800 123 4567"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setStep(2)}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FiCreditCard className="mr-2" /> Payment Method
                  </h2>
                  
                  <div className="mb-6">
                    <div className="flex space-x-4 mb-4">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`flex-1 py-4 border rounded-lg flex items-center justify-center ${
                          paymentMethod === 'card' 
                            ? 'border-primary-600 bg-primary-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <FiCreditCard className="mr-2" />
                        Credit/Debit Card
                      </button>
                      <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={`flex-1 py-4 border rounded-lg flex items-center justify-center ${
                          paymentMethod === 'paypal' 
                            ? 'border-primary-600 bg-primary-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        PayPal
                      </button>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={cardDetails.expiryDate}
                              onChange={handleCardChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              name="cvv"
                              value={cardDetails.cvv}
                              onChange={handleCardChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="123"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">Cardholder Name</label>
                          <input
                            type="text"
                            name="cardholderName"
                            value={cardDetails.cardholderName}
                            onChange={handleCardChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'paypal' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <p className="text-gray-700 mb-4">You will be redirected to PayPal to complete your payment</p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Continue with PayPal
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Back to Address
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FiShield className="mr-2" /> Review Order
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Shipping Address</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{shippingAddress.firstName} {shippingAddress.lastName}</p>
                      <p className="text-gray-700">{shippingAddress.street}</p>
                      <p className="text-gray-700">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                      <p className="text-gray-700">{shippingAddress.country}</p>
                      <p className="text-gray-700">{shippingAddress.phone}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Payment Method</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 capitalize">{paymentMethod}</p>
                      {paymentMethod === 'card' && (
                        <p className="text-gray-600 text-sm mt-1">Card ending in {cardDetails.cardNumber.slice(-4)}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Back to Payment
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
                    >
                      <FiCheck className="mr-2" /> Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 border border-gray-200 rounded-lg overflow-hidden mr-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">
                      ${(item.discountPrice ? item.discountPrice : item.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;