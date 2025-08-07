import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data: FormData) => ({
        url: "/category/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllCategory: build.query({
      query: () => ({
        url: "/category/",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateCategoryMutation, useGetAllCategoryQuery } =
  categoryApi;
