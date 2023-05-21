import { apiSlice } from '../api/apiSlice'


const addressApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postAddress: builder.mutation({
            query: (address) => ({
                method: "POST",
                url: "/address",
                body: address,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["address","state","city"]
        }),
        updateAddress: builder.mutation({
            query: (data) => ({
                method: "PUT",
                url: "/address",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["address"]
        }),
        deleteAddress: builder.mutation({
            query: (data) => ({
                method: "DELETE",
                url: "/address",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["address"]
        }),
        getAllAddress: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["address"]
        })
    })
})

export const {
   usePostAddressMutation,
   useGetAllAddressQuery,
   useDeleteAddressMutation,
   useUpdateAddressMutation
   
} = addressApi;