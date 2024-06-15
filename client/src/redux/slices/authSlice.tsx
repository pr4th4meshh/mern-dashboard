import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authSlice = createApi({
  reducerPath: "authSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (newUser) => ({
        url: "/signup",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
})

export const {useSignupMutation} = authSlice