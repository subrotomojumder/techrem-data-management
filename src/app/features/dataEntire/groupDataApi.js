import { apiSlice } from '../api/apiSlice'


const dataDataApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postGroupData: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/group_data_entry",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["groups"]
        }),
        getAllGroupData: builder.query({
            query: (query) => ({
                url: `/group_data_entry?${query}`,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["groups"]
        }),
    })
})

export const {
    usePostGroupDataMutation,
    useGetAllGroupDataQuery
} = dataDataApi;