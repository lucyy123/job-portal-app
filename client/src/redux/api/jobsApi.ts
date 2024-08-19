import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobsResponseMessage } from "../../vite-env";

const base = `${import.meta.env.VITE_SERVER}/api/v1/job`;

export const jobs = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: base, credentials: "include" }),
  endpoints: (builder) => ({

    getJobs: builder.query<JobsResponseMessage, string>({
      query: () => ({
        url: "/all/jobs",
        // params?: { search },
      }),
    }),
  }),
});

export const {useGetJobsQuery}=jobs