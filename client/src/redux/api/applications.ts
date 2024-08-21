import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import { LogoutUserResponseMessage } from "../../vite-env";

const base=`${import.meta.env.VITE_SERVER}/api/v1/applications`

export const applications = createApi({
reducerPath:"applicationApi",
baseQuery:fetchBaseQuery({baseUrl:base, credentials:"include"}),

endpoints:(builder)=>({
  applynewJob:builder.query<LogoutUserResponseMessage ,string>({
    query:(jobId)=>`/${jobId}`
  })
})

});

export const  { useLazyApplynewJobQuery} = applications