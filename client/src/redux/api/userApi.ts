import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Userlogn, UserResponseMessage } from "../../vite-env";

const base = `${import.meta.env.VITE_SERVER}/api/v1/user`;
console.log("base:", base);
export const user = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: base }),
  endpoints: (builder) => ({
    register: builder.mutation<UserResponseMessage<unknown>, User>({
      query: (user) => ({
        method: "POST",
        url: "/new/register",
        body: user,
      }),
    }),
    login: builder.mutation<UserResponseMessage<User>, Userlogn>({
      query: (user) => ({
        method: "POST",
        url: "/new/login",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation,useLoginMutation } = user;
