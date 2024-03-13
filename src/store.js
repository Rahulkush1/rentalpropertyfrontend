import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import propertySlice from "./Slice/propertySlice";
import { authApi } from "./services/auth/authService";
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
  reducer: {
    user: userSlice,
    properties: propertySlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});
// setupListeners(store.dispatch)
export default store;
