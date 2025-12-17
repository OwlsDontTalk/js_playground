import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const plant = action.payload;
      if (!state.items[plant.id]) {
        state.items[plant.id] = { ...plant, quantity: 1 };
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items[id];
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        delete state.items[id];
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        delete state.items[id];
      }
    }
  }
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} = cartSlice.actions;

export const selectCartItems = (state) => Object.values(state.cart.items);
export const selectCartCount = (state) =>
  Object.values(state.cart.items).reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  Object.values(state.cart.items).reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
