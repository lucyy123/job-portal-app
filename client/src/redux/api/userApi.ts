import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserResponseMessage } from "../../vite-env";

const base = `${import.meta.env.VITE_SERVER}/api/v1/user/`

export const user = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: base }),
    endpoints: (builder) => ({
        register: builder.mutation<UserResponseMessage,User>({
            query: (user) => ({
                method: "POST",
                url: "/new/register",
                body: user
            })
        })
    })
})


export const { useRegisterMutation } = user
