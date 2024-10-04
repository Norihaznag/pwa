import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],  // Array to hold menu items
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.items = action.payload;
    },
    addMenuItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeMenuItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
  },
});

export const { setMenuItems, addMenuItem, removeMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
