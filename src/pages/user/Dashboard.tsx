import React, { useState } from 'react';
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiSettings, FiLogOut, FiPackage, FiDollarSign, FiEye, FiStar } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    dispatch(logout());
  };

  // Mock data for demonstration
  const orders = [
    { id: 'ORD-001', date: '2023-05-15', status: 'Delivered', total: 129.99 },
    { id: 'ORD-002', date: '2023-06-20', status: 'Shipped', total: 89.50 },
    { id: 'ORD-003', date: '2023-07-05', status: 'Processing', total: 245.75 },
  ];

  const recentViewed = [
    { id: '1', name: 'Wireless Bluetooth Headphones', price: 99.99, image: 'https://via.placeholder.com/100x100' },
    { id: '2', name: 'Smart Fitness Watch', price: 149.99, image: 'https://via.placeholder.com/100x100' },
    { id: '3', name: 'Stainless Steel Cookware Set', price: 119.99, image: 'https://via.placeholder.com/100x100' },
  ];

  const wishlist = [
    { id: '4', name: 'Wireless Charging Pad', price: 39.99, image: 'https://via.placeholder.com/100x100' },
    { id: '5', name: 'Leather Wallet', price: 39.99, image: 'https://via.placeholder.com/100x100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <FiUser className="text-gray-600 text-2xl" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">{user?.name}</h2>
                  <p className="text-gray-600 text-sm">{user?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                    activeTab === 'overview' 
                      ? 'bg-primary-50 text-primary-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiUser className="mr-3" /> Overview
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                    activeTab === 'orders' 
                      ? 'bg-primary-50 text-primary-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiPackage className="mr-3" /> My Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                    activeTab === 'wishlist' 
                      ? 'bg-primary-50 text-primary-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiHeart className="mr-3" /> Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('recent')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                    activeTab === 'recent' 
                      ? 'bg-primary-50 text-primary-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiEye className="mr-3" /> Recently Viewed
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                    activeTab === 'addresses' 
                      ? 'bg-primary-50 text-primary-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiMapPin className="mr-3" /> Addresses
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                    activeTab === 'settings' 
                      ? 'bg-primary-50 text-primary-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiSettings className="mr-3" /> Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-50"
                >
                  <FiLogOut className="mr-3" /> Logout
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-primary-50 p-6 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                          <FiPackage className="text-primary-600 text-xl" />
                        </div>
                        <div>
                          <p className="text-gray-600">Total Orders</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-success-50 p-6 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center mr-4">
                          <FiDollarSign className="text-success-600 text-xl" />
                        </div>
                        <div>
                          <p className="text-gray-600">Total Spent</p>
                          <p className="text-2xl font-bold">$1,245.75</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-warning-50 p-6 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-warning-100 flex items-center justify-center mr-4">
                          <FiHeart className="text-warning-600 text-xl" />
                        </div>
                        <div>
                          <p className="text-gray-600">Wishlist</p>
                          <p className="text-2xl font-bold">8</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4">Order ID</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Total</th>
                            <th className="text-left py-3 px-4">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-100">
                              <td className="py-3 px-4">#{order.id}</td>
                              <td className="py-3 px-4">{order.date}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : order.status === 'Shipped' 
                                      ? 'bg-blue-100 text-blue-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                              <td className="py-3 px-4">
                                <button className="text-primary-600 hover:underline">View</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recently Viewed</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {recentViewed.map((product) => (
                        <div key={product.id} className="flex items-center border border-gray-200 rounded-lg p-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-16 h-16 object-contain mr-3"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 text-sm">{product.name}</h4>
                            <p className="text-primary-600 font-semibold">${product.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4">Order ID</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Total</th>
                          <th className="text-left py-3 px-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100">
                            <td className="py-3 px-4">#{order.id}</td>
                            <td className="py-3 px-4">{order.date}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800' 
                                  : order.status === 'Shipped' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <button className="text-primary-600 hover:underline mr-3">View</button>
                              <button className="text-gray-600 hover:underline">Track</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>
                  
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-48 object-contain p-4"
                          />
                          <div className="p-4">
                            <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-primary-600">${product.price.toFixed(2)}</span>
                              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiHeart className="text-gray-400 text-2xl" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-600 mb-6">Items you save will appear here</p>
                      <a href="/products" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700">
                        Start Shopping
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              {/* Recent Viewed Tab */}
              {activeTab === 'recent' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Viewed</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentViewed.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-48 object-contain p-4"
                        />
                        <div className="p-4">
                          <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary-600">${product.price.toFixed(2)}</span>
                            <button className="text-primary-600 hover:text-primary-700">
                              <FiHeart />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;