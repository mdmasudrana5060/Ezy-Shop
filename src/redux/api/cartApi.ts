import { Product } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

type TGetAllProductsResponse = {
  data: Product[];
  meta: TMeta;
};

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCart: build.mutation({
      query: (data: FormData) => ({
        url: "/cart/create-cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    getAllCart: build.query({
      query: () => ({
        url: `/cart/`,
        method: "GET",
      }),
      providesTags: [tagTypes.cart],
    }),
  }),
});

export const { useCreateCartMutation, useGetAllCartQuery } = cartApi;
