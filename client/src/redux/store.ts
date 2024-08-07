import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import { testSlice } from "./slices/testSlice"
import { authSlice } from "./slices/authSlice"
import userReducer from "./slices/userSlice"
import productReducer from "./slices/productSlice"
import configurationReducer from "./slices/configurationSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { productsSlice } from "./slices/productsSlice"
import { usersSlice } from "./slices/usersSlice"
import { categorySlice } from "./slices/categorySlice"
import { adminOrdersSlice } from "./slices/ordersApiSlice"

const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [productsSlice.reducerPath]: productsSlice.reducer,
  [usersSlice.reducerPath]: usersSlice.reducer,
  [categorySlice.reducerPath]: categorySlice.reducer,
  [adminOrdersSlice.reducerPath]: adminOrdersSlice.reducer,
  user: userReducer,
  product: productReducer,
  configuration: configurationReducer,
})

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authSlice.middleware)
      .concat(productsSlice.middleware)
      .concat(usersSlice.middleware)
      .concat(categorySlice.middleware)
      .concat(adminOrdersSlice.middleware),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;