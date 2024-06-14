import { configureStore } from "@reduxjs/toolkit"
import { testSlice } from "./slices/testSlice"

export const store = configureStore({
  reducer: {
    [testSlice.reducerPath]: testSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testSlice.middleware),
})
