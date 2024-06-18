import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsSlice = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/products" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/all",
      providesTags: ["Product"],
    }),
    getProductsByName: builder.query({
      query: (name) => {
        if (name) {
          return `/product/${name}`
        }
        return "/all"
      },
      providesTags: ["Product"],
    }),
  }),
})

export const { useGetAllProductsQuery, useGetProductsByNameQuery } =
  productsSlice
