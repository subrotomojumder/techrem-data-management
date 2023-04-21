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
            invalidatesTags: ["address"]
        }),
        getAllAddress: builder.query({
            query: () => ({
                url: `/address`,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["address"]
        }),
    })
})

export const {
   usePostAddressMutation,
   useGetAllAddressQuery
} = addressApi;