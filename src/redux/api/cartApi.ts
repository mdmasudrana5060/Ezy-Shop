// cartApi.ts
import { TCartResponse } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

// Cart API
const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create a new cart item
    createCart: build.mutation({
      query: ({ cartData, accessToken }) => ({
        url: "/cart/create-cart",
        method: "POST",
        data: cartData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    // Get all cart items
    getAllCart: build.query<TCartResponse[], string>({
      query: (accessToken) => ({
        url: "/cart",
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      }),
      providesTags: [tagTypes.cart],
    }),

    // Delete a cart item
    deleteCart: build.mutation({
      query: ({ cartId, accessToken, Id }) => {
        console.log(cartId, accessToken, Id, "from cart Api");
        return {
          url: `/cart/${Id}/${cartId}`,
          method: "DELETE",
          headers: {
            Authorization: `${accessToken}`,
          },
        };
      },
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});

export const {
  useCreateCartMutation,
  useGetAllCartQuery,
  useDeleteCartMutation,
} = cartApi;
