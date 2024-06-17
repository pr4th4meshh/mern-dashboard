import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import { testSlice } from "./slices/testSlice"
import { authSlice } from "./slices/authSlice"
import userReducer from "./slices/userSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  user: userReducer,
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
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)
