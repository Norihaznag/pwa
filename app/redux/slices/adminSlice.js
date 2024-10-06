import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,  // admin object containing admin data (e.g., id, name, email)
  isAuthenticated: false,  // Boolean flag to check if the admin is authenticated
  token: null,  // Authentication token
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateadmin: (state, action) => {
      state.admin = { ...state.admin, ...action.payload };
    }
  },
});

export const { login, logout, updateadmin } = adminSlice.actions;
export default adminSlice.reducer;
