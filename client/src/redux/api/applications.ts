import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";


const base = `${import.meta.env.VITE_SERVER}/api/v1/applications`

import { LogoutUserResponseMessage } from '../../vite-env';



export const applications = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({ baseUrl: base, credentials: "include" }),

  endpoints: (builder) => ({
    applynewJob: builder.query<LogoutUserResponseMessage, string>({
      query: (jobId) => `/${jobId}`
    })
  })

});

export const { useLazyApplynewJobQuery } = applications