import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import menuReducer from './slices/menuSlice';
import notificationReducer from './slices/notificationSlice';
import uiSlice from './slices/uiSlice'
import KartSlice from './slices/KartSlice'
import adminReducer from './slices/adminSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    admin : adminReducer , 
    cart: cartReducer,
    orders: orderReducer,
    menu: menuReducer,
    notifications: notificationReducer,
    ui : uiSlice,
    kart : KartSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
