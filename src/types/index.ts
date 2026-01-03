// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  specifications: Record<string, string>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Cart types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  stock: number;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

// Address types
export interface Address {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

// Review types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Filter and sort types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  search?: string;
}

export interface ProductSortOptions {
  sortBy: 'price' | 'rating' | 'name' | 'createdAt';
  order: 'asc' | 'desc';
}