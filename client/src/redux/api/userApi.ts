import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Userlogn, UserRegisterRequest, UserResponseMessage, UserUpdateResponseMessage } from "../../vite-env";

const base = `${import.meta.env.VITE_SERVER}/api/v1/user`;
console.log("base:", base);
export const user = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: base ,credentials:"include"}),
  endpoints: (builder) => ({
    register: builder.mutation<UserResponseMessage<User>, UserRegisterRequest>({
      query: ({formdata}) => ({
        method: "POST",
        url: "/new/register",
        body: formdata,
        
      }),
    }),
    login: builder.mutation<UserResponseMessage<User>, Userlogn>({
      query: (user) => ({
        method: "POST",
        url: "/new/login",
        body: user,
      }),
    }),

    updateUser: builder.mutation<UserUpdateResponseMessage,User>({
      query: (user) => ({
        method: "PUT",
        url: "/update/profile",
        body: user,        
      }),
    }),
    getUser:builder.query<User,string>({
      query:(id)=>({
        method:"GET",
        url:`/getUser/${id}`
        
      })
    })
  }),
});

export const { useRegisterMutation, useLoginMutation,useUpdateUserMutation,useGetUserQuery } = user;
