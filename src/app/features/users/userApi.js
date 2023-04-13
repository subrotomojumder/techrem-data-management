import { apiSlice } from '../api/apiSlice'


const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                method: "POST",
                url: "/user",
                body: user,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["user"]
        }),
        getEmployeeByQue: builder.query({
            query: (url_query) => ({
                url: `/user?${url_query}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["user"]
        })
    })
})

export const {
    useRegisterMutation,
    useGetEmployeeByQueQuery,
} = userApi;