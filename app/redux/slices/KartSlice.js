import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  totalOrders: 0,
};

const updateTotals = (state) => {
  state.total = 0;
  state.totalOrders = 0;

  state.items.forEach((item) => {
    let itemTotal = 0;
    item.order.options.forEach((option) => {
      itemTotal += option.price * option.quantity;
      state.totalOrders += option.quantity;
    });
    item.order.total = itemTotal;
    state.total += itemTotal;
  });
};

const KartSlice = createSlice({
  name: "Kart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        detail: action.payload.detail,
        order: {
          options: action.payload.order.options.map((option) => ({
            size: option.size,
            quantity: option.quantity,
            price: option.price,
          })),
          total: 0, // Initialize total to 0
        },
      };

      const existingItemIndex = state.items.findIndex(
        (item) => item.detail.id === newItem.detail.id
      );

      if (existingItemIndex === -1) {
        state.items.push(newItem);
      } else {
        newItem.order.options.forEach((newSize) => {
          const existingSize = state.items[
            existingItemIndex
          ].order.options.find((size) => size.size === newSize.size);
          if (existingSize) {
            existingSize.quantity += newSize.quantity;
          } else {
            state.items[existingItemIndex].order.options.push(newSize);
          }
        });
      }

      updateTotals(state);
    },

    removeItem: (state, action) => {
      const { id } = action.payload.detail;
      const itemToremoveIndex = state.items.findIndex((item)=> item.detail.id == id );
      state.items = state.items.filter(item => item.detail.id !== id);
      updateTotals(state);
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((i) => i.detail.id === id);

      if (item) {
        const sizeItem = item.order.options.find((s) => s.size === size);
        if (sizeItem) {
          sizeItem.quantity = quantity;
        }

        updateTotals(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalOrders = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity,clearCart } = KartSlice.actions;
export default KartSlice.reducer;
