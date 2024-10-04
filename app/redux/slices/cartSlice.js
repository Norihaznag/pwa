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
    item.options.forEach((option) => {
      itemTotal += option.price * option.quantity;
      state.totalOrders += option.quantity;
    });
    item.total = itemTotal;
    state.total += itemTotal;
  });

  console.log(state.items)
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
   

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      console.log(existingItemIndex)
      
      if (existingItemIndex === -1) {
        state.items.push(newItem);
      }
      else {
        newItem.options.forEach((newSize) => {
          const existingSize = state.items[
            existingItemIndex
          ].options.find((size) => size.id === newSize.id);
          if (existingSize) {
            existingSize.quantity += newSize.quantity;
          } else {
            state.items[existingItemIndex].options.push(newSize);
          }
        });

    console.log("item exists", newItem.options);
      }

      updateTotals(state);
    },

    removeItem: (state, action) => {
      const newItem = action.payload;
      if (!newItem || !newItem.id) return;

      const { id } = newItem;
      state.items = state.items.filter((item) => item.id !== id);
      updateTotals(state);
      console.log('remove item func worked')
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

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

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
