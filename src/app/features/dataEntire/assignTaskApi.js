import { apiSlice } from '../api/apiSlice'

const assignTaskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postMarketerTask: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/divide_work/marketer_divide",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["field_marketer"]
        }),
        // getAllData: builder.query({
        //     query: (query) => ({
        //         url: `/data_entry?${query}`,
        //         headers: {
        //             authorization: localStorage.getItem("tech_token"),
        //         }
        //     }),
        //     providesTags: ["field_marketer""]
        // }),
    })
})

export const {
    usePostMarketerTaskMutation
} = assignTaskApi;