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
    })
})

export const {
    useGetCampaignQuery,
    usePostCampaignMutation,
} = campaignManageApi;