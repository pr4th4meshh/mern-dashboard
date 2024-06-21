import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const usersSlice = createApi({
  reducerPath: "usersSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/user`,
    credentials: "include",
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().user.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/all",
        method: "GET"
      })
    }),
  }),
})

export const { useUpdateUserMutation, useGetUserDetailsQuery, useGetAllUsersQuery } = usersSlice
