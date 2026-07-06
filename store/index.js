import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "@/slice/authSlice"
import donationReducer from "@/slice/donationSlice"


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: ["donation"]
}

const rootReducer = combineReducers({
  auth: authReducer,
  donation: donationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
