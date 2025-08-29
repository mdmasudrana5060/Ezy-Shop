import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import productsReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  products: productsReducer,
  auth: authReducer,
});
