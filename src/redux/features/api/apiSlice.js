import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_DEF_URL,
        // baseUrl: process.env.REACT_APP_VERCEL_URL,
    }),
    tagTypes:["Jobs","chatting"],
    endpoints: () => ({}),

});


export default apiSlice;