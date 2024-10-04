import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],  // Array to hold notifications
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.messages.push(action.payload);
    },
    removeNotification: (state, action) => {
      const id = action.payload;
      state.messages = state.messages.filter(message => message.id !== id);
    },
    clearNotifications: (state) => {
      state.messages = [];
    }
  },
});

export const { addNotification, removeNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
