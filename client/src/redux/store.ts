import { configureStore } from "@reduxjs/toolkit"
import { testSlice } from "./slices/testSlice"
import { authSlice } from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    [testSlice.reducerPath]: testSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(testSlice.middleware)
      .concat(authSlice.middleware),
})
