import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    cart: productSlice.reducer
  }
})