import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import propertySlice from "./Slice/propertySlice";
import { authApi } from "./services/auth/authService";

import { propertyApi } from "./services/auth/propertyService";
import citySlice from "./Slice/citySlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    properties: propertySlice,
    cities: citySlice,
    [authApi.reducerPath]: authApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware).concat(propertyApi.middleware)
  },
});
// setupListeners(store.dispatch)
export default store;
