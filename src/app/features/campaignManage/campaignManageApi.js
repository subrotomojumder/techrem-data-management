import { apiSlice } from "../api/apiSlice";

const campaignManageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCampaign: builder.query({
            query: (query) => ({
                url: `/campaign${query}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["campaignData"]
        }),
        postCampaign: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/campaign",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["campaignData"]
        }),
        updateCampaign: builder.mutation({
            query: ({ data, url }) => ({
                method: "PUT",
                url: url,
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["campaignData"]
        }),
        // employee task manage
        getOperatorTasks: builder.query({
            query: (query) => ({
                url: `/operator_data${query}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["campaignData"]
        }),
        postEmployeeTask: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/operator_data",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            invalidatesTags: ["campaignData", "singleData"]
        }),
    })
})

export const {
    useGetCampaignQuery,
    usePostCampaignMutation,
    useUpdateCampaignMutation,
    useGetOperatorTasksQuery,
    usePostEmployeeTaskMutation
} = campaignManageApi;