import { apiSlice } from "../api/apiSlice";

const campaignManageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeTask: builder.query({
            query: (url) => ({
                url: url,
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("tech_token"),
                }
            }),
            providesTags: ["tasks"]
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
    })
})

export const {
    usePostCampaignMutation,
} = campaignManageApi;