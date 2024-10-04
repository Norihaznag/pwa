import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],  // Array to hold all orders
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const existingOrder = state.orders.find(order => order.id === id);
      if (existingOrder) {
        existingOrder.status = status;
      }
    },
    cancelOrder: (state, action) => {
      const id = action.payload;
      state.orders = state.orders.filter(order => order.id !== id);
    }
  },
});

export const { createOrder, updateOrderStatus, cancelOrder } = orderSlice.actions;
export default orderSlice.reducer;
