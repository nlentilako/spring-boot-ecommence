import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
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

interface ProductState {
  featured: Product[];
  categories: string[];
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  featured: [],
  categories: [],
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featured = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    updateProductStock: (state, action: PayloadAction<{ productId: string; newStock: number }>) => {
      const product = state.products.find(p => p.id === action.payload.productId);
      if (product) {
        product.stock = action.payload.newStock;
      }
      
      if (state.selectedProduct && state.selectedProduct.id === action.payload.productId) {
        state.selectedProduct.stock = action.payload.newStock;
      }
    },
  },
});

export const { 
  setLoading, 
  setError, 
  setFeaturedProducts, 
  setCategories, 
  setProducts, 
  setSelectedProduct,
  updateProductStock 
} = productSlice.actions;
export default productSlice.reducer;