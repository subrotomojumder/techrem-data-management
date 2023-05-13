import { apiSlice } from "../api/apiSlice";



const othersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postCategory: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/catagory",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["category"]
        }),
        getAllCategory: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["category"]
        }),
        getOfferService: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["our_service"]
        }),
    })
})

export const {
    usePostCategoryMutation,
    useGetAllCategoryQuery,
    useGetOfferServiceQuery
} = othersApi;