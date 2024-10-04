import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  // User object containing user data (e.g., id, name, email)
  isAuthenticated: false,  // Boolean flag to check if the user is authenticated
  token: null,  // Authentication token
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
