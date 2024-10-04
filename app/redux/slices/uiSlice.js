import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    window : false,
    cart:false,
    asideMobile : false,
    isModeAdmin : false,
    admincart : false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    hide: (state) => {
      state.window = false
    },
    toggleCart: (state) => {
      state.cart = !state.cart
      },
    hideCart : (state) => {
      state.cart = false
      },
    toggle: (state)=>{
        state.window = !state.window
    },
    adminTurnOn : (state)=>{
      state.isModeAdmin = true
    },
    ShowAdmincart : (state)=>{
      state.admincart = true
    },
    HideAdmincart : (state)=>{
      state.admincart = false
    }
  },
});

export const {
  hide , show , toggle , hideCart  , toggleCart , adminTurnOn , HideAdmincart , ShowAdmincart
} = uiSlice.actions;
export default uiSlice.reducer;
