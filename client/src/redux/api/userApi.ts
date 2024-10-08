import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LogoutUserResponseMessage, User, Userlogn, UserRegisterRequest, UserResponseMessage, UserUpdateRequest, UserUpdateResponseMessage } from "../../vite-env";

const base = `${import.meta.env.VITE_SERVER}/api/v1/user`;
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

  logout:builder.query<LogoutUserResponseMessage,unknown>({
    query:()=>"/logout"
    
  }),

    updateUser: builder.mutation<UserUpdateResponseMessage,UserUpdateRequest>({
      query: ({formdata}) => ({
        method: "PUT",
        url: "/update/profile",
        body: formdata,        
      }),
    }),
    getUser:builder.query<User,string>({
      query:(id)=>({
        url:`/getUser/${id}`
        
      })
    })
  }),
});

export const { useRegisterMutation, useLoginMutation,useUpdateUserMutation,useGetUserQuery,useLogoutQuery } = user;
