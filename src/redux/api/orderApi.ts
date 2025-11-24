import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

// Cart API
const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (orderData) => {
        return {
          url: "/order/create-order",
          method: "POST",
          data: orderData,
        };
      },
      invalidatesTags: [tagTypes.order],
    }),

    // Get all cart items
    // getAllCart: build.query<TCartResponse, string>({
    //   query: (accessToken) => ({
    //     url: "/cart",
    //     method: "GET",
    //     headers: {
    //       Authorization: accessToken, // no Bearer
    //     },
    //   }),
    //   providesTags: [tagTypes.cart],
    // }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
