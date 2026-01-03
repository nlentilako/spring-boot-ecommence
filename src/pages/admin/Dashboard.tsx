import React, { useState } from 'react';
import { FiBarChart2, FiShoppingBag, FiUser, FiDollarSign, FiPackage, FiTag, FiDownload, FiFilter, FiChevronDown } from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const revenueData = [
    { date: 'Jan 1', revenue: 4000, orders: 240 },
    { date: 'Jan 2', revenue: 3000, orders: 138 },
    { date: 'Jan 3', revenue: 2000, orders: 198 },
    { date: 'Jan 4', revenue: 2780, orders: 189 },
    { date: 'Jan 5', revenue: 1890, orders: 149 },
    { date: 'Jan 6', revenue: 2390, orders: 209 },
    { date: 'Jan 7', revenue: 3490, orders: 240 },
  ];

  const topProducts = [
    { id: 1, name: 'Wireless Bluetooth Headphones', sales: 120, revenue: 12000 },
    { id: 2, name: 'Smart Fitness Watch', sales: 95, revenue: 14250 },
    { id: 3, name: 'Stainless Steel Cookware Set', sales: 80, revenue: 9600 },
    { id: 4, name: 'Wireless Charging Pad', sales: 75, revenue: 2925 },
    { id: 5, name: 'Leather Wallet', sales: 70, revenue: 2730 },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2023-05-15', status: 'Delivered', total: 129.99 },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2023-05-14', status: 'Shipped', total: 89.50 },
    { id: 'ORD-003', customer: 'Bob Johnson', date: '2023-05-14', status: 'Processing', total: 245.75 },
    { id: 'ORD-004', customer: 'Alice Williams', date: '2023-05-13', status: 'Delivered', total: 67.20 },
    { id: 'ORD-005', customer: 'Charlie Brown', date: '2023-05-12', status: 'Cancelled', total: 156.80 },
  ];

  const kpiData = {
    totalRevenue: 124575.50,
    totalOrders: 1245,
    totalCustomers: 892,
    avgOrderValue: 99.98,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
              <FiDownload className="mr-2" /> Export
            </button>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <FiDollarSign className="text-primary-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${kpiData.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center mr-4">
                <FiPackage className="text-success-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{kpiData.totalOrders.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-warning-100 flex items-center justify-center mr-4">
                <FiUser className="text-warning-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">Customers</p>
                <p className="text-2xl font-bold">{kpiData.totalCustomers.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <FiBarChart2 className="text-indigo-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold">${kpiData.avgOrderValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue & Orders</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="orders" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
              <button className="text-primary-600 hover:underline text-sm">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">#{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'Shipped' 
                              ? 'bg-blue-100 text-blue-800' 
                              : order.status === 'Processing' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center px-4 py-3 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100">
                <FiShoppingBag className="mr-3" /> Manage Products
              </button>
              <button className="w-full flex items-center px-4 py-3 bg-success-50 text-success-600 rounded-lg hover:bg-success-100">
                <FiUser className="mr-3" /> Manage Users
              </button>
              <button className="w-full flex items-center px-4 py-3 bg-warning-50 text-warning-600 rounded-lg hover:bg-warning-100">
                <FiPackage className="mr-3" /> Manage Orders
              </button>
              <button className="w-full flex items-center px-4 py-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
                <FiTag className="mr-3" /> Manage Promotions
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Alert</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">5 products are running low on stock</p>
                <button className="mt-2 text-red-600 hover:underline text-sm">View details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;