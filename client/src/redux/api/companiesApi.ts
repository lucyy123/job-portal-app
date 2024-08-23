import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateCompanyRequest,
  CreateCompanyRespone,
  GetAllComapanyResponseMessage,
  NewCompanyRequest,
  SinglecompanyResponseCompany,
} from "../../vite-env";

const base = `${import.meta.env.VITE_SERVER}/api/v1/company`;

export const companies = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: base, credentials: "include" }),
  tagTypes: ["company"],
  endpoints: (builder) => ({
    allCompanies: builder.query<GetAllComapanyResponseMessage, string>({
      query: () => "/all",
    }),

    getCompanyById: builder.query<SinglecompanyResponseCompany, string>({
      query: (id) => `/${id}`,
    }),

    createCompany: builder.mutation<CreateCompanyRespone, NewCompanyRequest>(
      {
        query: (company) => ({
          method: "POST",
          url: "/register",
          body:company ,
        }),
      }
    ),

    updateCompany: builder.mutation<CreateCompanyRespone, CreateCompanyRequest>(
      {
        query: ({ formdata, id }) => ({
          method: "PUT",
          url: `/${id}`,
          body: formdata,
        }),
      }
    ),
  }),
});

export const {
  useLazyAllCompaniesQuery,
  useLazyGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} = companies;
