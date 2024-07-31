import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

export const categorySlice = createApi({
  reducerPath: "categories",
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/category`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.user.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
        query: () => "/all"
    })
  }),
})

export const { useGetAllCategoriesQuery } = categorySlice
