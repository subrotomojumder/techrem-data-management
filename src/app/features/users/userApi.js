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
                    authorization: `${localStorage.getItem('token')}`,
                }
            }),
            invalidatesTags: ["user"]
        })
    })
})

export const {
    useRegisterMutation
} = userApi;