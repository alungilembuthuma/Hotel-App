import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import accommodationReducer from './features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    accommodation: accommodationReducer, 
  },
});

export default store;
