import { apiSlice } from '../api/apiSlice'

const assignTaskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postMarketerTask: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/divide_work/marketer_divide",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["marketer"]
        }),
        postEntireTask: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/divide_work/dataEntry_divide",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["entires"]
        }),
        postTelemarketerTask: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/divide_work/tele_divide",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["tele", "data"]
        }),
        postFieldMarketerTask: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/divide_work/onField_divide",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["field", "data"]
        }),
    })
})

export const {
    usePostEntireTaskMutation,
    usePostMarketerTaskMutation,
    usePostTelemarketerTaskMutation,
    usePostFieldMarketerTaskMutation
} = assignTaskApi;