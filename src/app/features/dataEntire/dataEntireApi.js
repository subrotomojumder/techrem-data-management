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
                    authorization: `${localStorage.getItem('token')}`,
                }
            }),
            invalidatesTags: ["data"]
        }),
        getAllData: builder.query({
            query: (query) => ({
                url: `/data_entry?${query}`,
                headers: {
                    authorization: `${localStorage.getItem('token')}`,
                }
            }),
            providesTags: ["data"]
        }),
    })
})

export const {
    useGetAllDataQuery,
    usePostDataMutation
} = dataEntireApi;