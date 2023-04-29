import { apiSlice } from '../api/apiSlice'

const dataEntireApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postData: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/data_entry",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["data"]
        }),
        getAllData: builder.query({
            query: (query) => ({
                url: `/data_entry?${query}`,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["data","singleData"]
        }),
        getEntireDataById: builder.query({
            query: (params) => ({
                url: `/data_entry/${params}`,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["singleData"]
        }),
    })
})

export const {
    useGetAllDataQuery,
    usePostDataMutation,
    useGetEntireDataByIdQuery
} = dataEntireApi;