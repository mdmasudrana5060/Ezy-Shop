import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

// type TGetAllProductsResponse = {
//   data: Product[];
//   meta: TMeta;
// };

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCart: build.mutation({
      query: (cartData) => {
        console.log(cartData, "cartData from frontend"); // ✅ log

        return {
          url: `/cart/create-cart`,
          method: "POST",
          data: { cart: cartData }, // use 'data' for axios body
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ axios option for sending cookies
        };
      },
      invalidatesTags: [tagTypes.cart],
    }),

    getAllCart: build.query({
      query: () => ({
        url: `/cart/`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [tagTypes.cart],
    }),
  }),
});

export const { useCreateCartMutation, useGetAllCartQuery } = cartApi;
