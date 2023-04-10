import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/users/userSlice";
import { apiSlice } from "./features/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})