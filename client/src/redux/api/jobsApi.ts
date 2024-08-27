import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AminAllJobResponseMessage, JobCreated, JobCreatedResMessage, JobResponseMessage, JobsResponseMessage, } from "../../vite-env";

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

    getSingleJob: builder.query<JobResponseMessage, string>({
      query: (id) => `/${id}`
    }),

    getAdminJobs: builder.query<AminAllJobResponseMessage, string>({
      query: () => "/all/recruiter-job"
    }),


    getJobByItsid: builder.query<JobResponseMessage, string>({
      query: (id) => `/${id}`
    }),


    postJob:builder.mutation<JobCreatedResMessage,JobCreated> ({
      query:(job)=>({
        method:"POST",
        body:job,
        url:'/create/new'
      })
    }),

    getJobsByQuery:builder.query <JobsResponseMessage, string>({
      query:(query)=>`/all/jobs?search=${query}` 
    })




  }),
});

export const { useLazyGetJobsByQueryQuery ,  useGetJobsQuery, useGetSingleJobQuery, useLazyGetAdminJobsQuery, useLazyGetJobByItsidQuery,usePostJobMutation } = jobs