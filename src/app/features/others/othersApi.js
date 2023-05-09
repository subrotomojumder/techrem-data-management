import { apiSlice } from "../api/apiSlice";



const othersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // postGroupData: builder.mutation({
        //     query: (data) => ({
        //         method: "POST",
        //         url: "/group_data_entry",
        //         body: data,
        //         headers: {
        //             'content-type': 'application/json',
        //             authorization: localStorage.getItem("tech_token"),
        //         }
        //     }),
        //     invalidatesTags: ["groups"]
        // }),
        getAllCategory: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["category"]
        }),
    })
})

export const {
    useGetAllCategoryQuery
} = othersApi;