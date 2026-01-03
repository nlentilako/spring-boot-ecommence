import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      
      if (existingItem) {
        // Check if adding would exceed stock
        if (existingItem.quantity + 1 <= existingItem.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      // Recalculate total and item count
      state.total = state.items.reduce((sum, item) => 
        sum + (item.discountPrice || item.price) * item.quantity, 0
      );
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i.productId !== action.payload.productId);
        } else if (action.payload.quantity <= item.stock) {
          item.quantity = action.payload.quantity;
        }
      }
      
      // Recalculate total and item count
      state.total = state.items.reduce((sum, item) => 
        sum + (item.discountPrice || item.price) * item.quantity, 0
      );
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      
      // Recalculate total and item count
      state.total = state.items.reduce((sum, item) => 
        sum + (item.discountPrice || item.price) * item.quantity, 0
      );
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;