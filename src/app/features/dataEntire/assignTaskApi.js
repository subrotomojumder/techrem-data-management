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
        postField_TelemarketerTask: builder.mutation({
            query: ({task_data, postUrl}) => ({
                method: "POST",
                url:  postUrl,
                body: task_data,
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
            invalidatesTags: ["tasks", "singleData", "submission"]
        }),
        updateOperatorSubmissionById: builder.mutation({
            query: ({ url, updateData }) => ({
                method: "PUT",
                url: url,
                body: updateData,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags:["singleData", "submission"]
        }),
        getOperatorSubmissionById: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["submission"]
        }),
    })
})

export const {
    usePostEntireTaskMutation,
    usePostMarketerTaskMutation,
    usePostField_TelemarketerTaskMutation,
    useGetEmployeeTaskQuery,
    usePostFieldMarketerTaskMutation,
    useUpdateOperatorSubmissionByIdMutation,
    usePostOperatorTaskSubmitMutation,
    useGetOperatorSubmissionByIdQuery
} = assignTaskApi;