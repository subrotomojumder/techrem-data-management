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
        getAllAddress: builder.query({
            query: () => ({
                url: `/address`,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["address"]
        }),
        // getAllCountry: builder.query({
        //     query: (query) => ({
        //         url: `/address/country`,
        //         headers: {
        //             authorization: localStorage.getItem("tech_token"),
        //         }
        //     }),
        //     providesTags: ["state"]
        // }),
        getAllState: builder.query({
            query: (query) => ({
                url: `/address/state?${query}`,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["state"]
        }),
        getAllCity: builder.query({
            query: (query) => ({
                url: `/address/city?${query}`,
                headers: {
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["city"]
        }),
    })
})

export const {
   usePostAddressMutation,
   useGetAllAddressQuery,
   useGetAllStateQuery,
   useGetAllCityQuery
} = addressApi;