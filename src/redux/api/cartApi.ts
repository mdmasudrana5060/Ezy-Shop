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
    createCart: build.mutation<
      TCartResponse,
      { cartData: TCartItem; accessToken: string }
    >({
      query: ({ cartData, accessToken }) => ({
        url: "/cart/create-cart",
        method: "POST",
        data: { cart: cartData }, // ✅ here it's `data` since you use axios
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    // Get all cart items
    getAllCart: build.query({
      query: (accessToken) => {
        return {
          url: `/cart/`,
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        };
      },
      providesTags: [tagTypes.cart],
    }),
  }),
});

export const { useCreateCartMutation, useGetAllCartQuery } = cartApi;
