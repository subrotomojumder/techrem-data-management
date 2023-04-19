import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_DEV,
    }),
    tagTypes: [
        "user","data", "groups","marketer","tele" , "entires", "field", "address"
    ],
    endpoints: (builder) => ({}),
})