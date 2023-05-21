import { apiSlice } from "../api/apiSlice";



const othersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // category enquiry api
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
        getDeshbordData: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["dashboard"]
        }),
        // we can offer service api
        getOurService: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["our_service"]
        }),
        postOurService: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/service_we_offer",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["our_service"]
        }),
        deleteOurService: builder.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `service_we_offer/${id}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["our_service"]
        }),
        updateOurService: builder.mutation({
            query: (data) => ({
                method: "PUT",
                body: { name: data.name, active: data.active },
                url: `service_we_offer/${data?.id}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["our_service"]
        }),
    })
})

export const {
    usePostCategoryMutation,
    useGetAllCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetOurServiceQuery,
    usePostOurServiceMutation,
    useDeleteOurServiceMutation,
    useUpdateOurServiceMutation,
    useGetDeshbordDataQuery
} = othersApi;