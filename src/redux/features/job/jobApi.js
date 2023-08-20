import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/job",
                body: data,
            }),
            invalidatesTags: ["Jobs"],
        }),

        apply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/apply",
                body: data,
            }),
            invalidatesTags: ["Jobs"],
        }),

        questions: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/query",
                body: data,
            }),
            invalidatesTags: ["chatting"],
        }),

        reply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/reply",
                body: data,
            }),
            invalidatesTags: ["chatting"],
        }),

        search: builder.query({
            query: (key) => ({
                url: `/search/${key}`,
            })
        }),

        appliedJob: builder.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`,
            }),
            providesTags: ["Jobs"],
        }),

        getJobs: builder.query({
            query: () => ({
                url: "/jobs",
            }),
            providesTags: ["Jobs"],
        }),

        getJobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`,
            }),
            providesTags: ["chatting"]
        }),


    })
})


export const { usePostJobMutation, useGetJobsQuery, useGetJobByIdQuery, useApplyMutation, useAppliedJobQuery, useQuestionsMutation, useReplyMutation, useSearchQuery } = jobApi;