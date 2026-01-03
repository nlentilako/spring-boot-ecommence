import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: 'About Us', path: '/about' },
    { title: 'Contact', path: '/contact' },
    { title: 'Help Center', path: '/help' },
    { title: 'Shipping Info', path: '/shipping' },
    { title: 'Returns', path: '/returns' },
  ];

  const categories = [
    { title: 'Electronics', path: '/products?category=electronics' },
    { title: 'Fashion', path: '/products?category=fashion' },
    { title: 'Home & Kitchen', path: '/products?category=home' },
    { title: 'Beauty', path: '/products?category=beauty' },
    { title: 'Sports', path: '/products?category=sports' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary-400">Smart</span>
              <span className="text-secondary-400">Shop</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for all your shopping needs. Quality products at competitive prices with excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    to={category.path} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <FiMapPin className="mr-3 text-primary-400" />
                <span>123 Shopping Street, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center text-gray-300">
                <FiPhone className="mr-3 text-primary-400" />
                <span>+234 800 123 4567</span>
              </li>
              <li className="flex items-center text-gray-300">
                <FiMail className="mr-3 text-primary-400" />
                <span>support@smartshop.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">Download Our App</h5>
              <div className="flex space-x-3">
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  App Store
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} SmartShop. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 text-sm hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;