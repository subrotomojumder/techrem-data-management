import { apiSlice } from '../api/apiSlice'

const assignTaskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeTask: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["tasks"]
        }),
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
            invalidatesTags: ["tasks"]
        }),
        // data entire
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
            invalidatesTags: ["tasks"]
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
            invalidatesTags: ["tasks", "data"]
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
            invalidatesTags: ["tasks", "data"]
        }),
        // all operator task submit api
        postOperatorTaskSubmit: builder.mutation({
            query: ({ url, data }) => ({
                method: "POST",
                url: url,
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["tasks"]
        }),
        getOperatorSubmissionById: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            })
        }),
    })
})

export const {
    usePostEntireTaskMutation,
    usePostMarketerTaskMutation,
    usePostTelemarketerTaskMutation,
    useGetEmployeeTaskQuery,
    usePostFieldMarketerTaskMutation,
    usePostOperatorTaskSubmitMutation
} = assignTaskApi;