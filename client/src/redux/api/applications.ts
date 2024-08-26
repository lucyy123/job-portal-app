import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";


const base = `${import.meta.env.VITE_SERVER}/api/v1/applications`

import { getAllApplicantsOfJobResMessage, LogoutUserResponseMessage, UpdateApplicationReq, UpdateApplicationResponse } from '../../vite-env';



export const applications = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({ baseUrl: base, credentials: "include" }),

  endpoints: (builder) => ({
    applynewJob: builder.query<LogoutUserResponseMessage, string>({
      query: (jobId) => `/${jobId}`
    }),
    applicantsOfJob:builder.query<getAllApplicantsOfJobResMessage,string>({
      query: (jobId)=> `job/${jobId}/applicants`
    }),
   updateApplication:builder.mutation <UpdateApplicationResponse,UpdateApplicationReq>({
    query:({data,id})=>({
    method:'PUT',
    body:data ,
     url:`/status/${id}`}),
   }),
  })

});

export const { useLazyApplynewJobQuery,useLazyApplicantsOfJobQuery,useUpdateApplicationMutation } = applications