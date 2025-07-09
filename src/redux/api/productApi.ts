import { Product } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

// NOTE: these are the _SAME_ API reference!
const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllProduct: build.query<Product[], Record<string, any>>({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
  }),
});

export const { useCreateProductMutation, useGetAllProductQuery } = productsApi;
