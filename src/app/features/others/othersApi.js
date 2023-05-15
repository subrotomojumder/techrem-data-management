import { apiSlice } from "../api/apiSlice";



const othersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postCategory: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/category",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["category"]
        }),
        updateCategory: builder.mutation({
            query: (data) => ({
                method: "PUT",
                url: "/category",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["category"]
        }),
        deleteCategory: builder.mutation({
            query: (data) => ({
                method: "DELETE",
                url: "/category",
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
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetOfferServiceQuery
} = othersApi;