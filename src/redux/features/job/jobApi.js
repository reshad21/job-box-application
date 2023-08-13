import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/job",
                body: data,
            }),
            invalidatesTags:["Jobs"],
        }),
        getJobs: builder.query({
            query: () => ({
                url: "/jobs",
            }),
            providesTags:["Jobs"],
        }),
        getJobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`,
            }),
        }),
    })
})


export const { usePostJobMutation, useGetJobsQuery, useGetJobByIdQuery } = jobApi;