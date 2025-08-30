import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

// Cart API Types
type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

type TCartItem = {
  productId: string;
  quantity: number;
};

type TCartResponse = {
  data: TCartItem[];
  meta?: TMeta;
};

// Cart API
const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create a new cart item
    createCart: build.mutation<TCartResponse, TCartItem>({
      query: (cartData) => ({
        url: "/cart/create-cart",
        method: "POST",
        data: { cart: cartData },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    // Get all cart items
    getAllCart: build.query({
      query: (accessToken) => {
        console.log("Access Token being sent from cartApi", accessToken);
        return {
          url: `/cart/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: [tagTypes.cart],
    }),
  }),
});

export const { useCreateCartMutation, useGetAllCartQuery } = cartApi;
