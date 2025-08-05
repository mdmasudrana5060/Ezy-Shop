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

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data: FormData) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    getAllProducts: build.query({
      query: ({ page, limit }) => ({
        url: `/product?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response, meta) => {
        return { response, meta };
      },
      providesTags: [tagTypes.product],
    }),

    getProduct: build.query<Product, number>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductQuery,
} = productsApi;
