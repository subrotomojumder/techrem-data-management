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
        userLogin: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/user/login",
                body: data,
                headers: {
                    'content-type': 'application/json',
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
        }),
        userDelete: builder.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/user/${id}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            invalidatesTags: ["user"]
        }),
    })
})

export const {
    useRegisterMutation,
    useUserLoginMutation,
    useGetEmployeeByQueQuery,
    useUserDeleteMutation,
} = userApi;