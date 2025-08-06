import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import productsReducer from "./slices/productSlice";

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  products: productsReducer,
});
