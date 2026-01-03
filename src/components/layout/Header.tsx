import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiChevronDown, FiSearch } from 'react-icons/fi';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import { CartItem } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  
  const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

  const categories = [
    'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 
    'Sports', 'Books', 'Toys', 'Automotive'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="hidden md:flex space-x-6">
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/help" className="hover:underline">Help</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              <span className="text-primary-600">Smart</span>
              <span className="text-secondary-600">Shop</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button 
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FiSearch className="text-xl" />
            </button>
            
            <Link to="/wishlist" className="relative p-2 text-gray-700 hover:text-red-500 transition-colors">
              <FiHeart className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <FiShoppingCart className="text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-1 p-2 text-gray-700 hover:text-primary-600 transition-colors">
                <FiUser className="text-xl" />
                <span className="hidden md:inline">{isAuthenticated ? user?.name : 'Account'}</span>
                <FiChevronDown className="hidden md:inline" />
              </button>
              
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
                  >
                    {isAuthenticated ? (
                      <>
                        <Link 
                          to="/dashboard" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Account
                        </Link>
                        {user?.role === 'admin' && (
                          <Link 
                            to="/admin" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Login
                        </Link>
                        <Link 
                          to="/register" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Category Dropdown - Desktop */}
        <div className="hidden lg:block mt-4">
          <nav className="flex space-x-8 overflow-x-auto">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium whitespace-nowrap">
              Home
            </Link>
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/products?category=${category.toLowerCase()}`}
                className="text-gray-700 hover:text-primary-600 font-medium whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden px-4 pb-4"
          >
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="lg:hidden fixed inset-0 bg-white z-50 pt-20"
          >
            <div className="container mx-auto px-4">
              <nav className="space-y-4">
                <Link 
                  to="/" 
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
                  {categories.map((category) => (
                    <Link 
                      key={category} 
                      to={`/products?category=${category.toLowerCase()}`}
                      className="block py-2 text-gray-700 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>

                {isAuthenticated ? (
                  <div className="border-t pt-4">
                    <Link 
                      to="/dashboard" 
                      className="block py-2 text-gray-700 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    {user?.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="block py-2 text-gray-700 hover:text-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-gray-700 hover:text-primary-600"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="border-t pt-4">
                    <Link 
                      to="/login" 
                      className="block py-2 text-gray-700 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="block py-2 text-gray-700 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;