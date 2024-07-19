import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminOrdersSlice = createApi({
  reducerPath: "adminOrders",
  tagTypes: ["AdminOrders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/orders",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAdminOrders: builder.query({
      query: () => "/all",
      providesTags: ["AdminOrders"],
    }),
    updateOrderStatus: builder.mutation({
      invalidatesTags: ["AdminOrders"],
      query: ({ orderId, status }) => ({
        url: `/${orderId}/updateStatus`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
})

export const { useGetAdminOrdersQuery, useUpdateOrderStatusMutation } =
  adminOrdersSlice
