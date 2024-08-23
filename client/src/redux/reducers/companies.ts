import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComapniesReducerInitialState, Company } from "../../vite-env";

const initialState: ComapniesReducerInitialState = {
  companies: null,
  singleCompany: null,
  loading: true
};

export const companiesRwducer = createSlice({
  name: "companies",
  initialState,
  reducers: {
    getAllCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
      state.loading = false
    },
    noAllCompanies: (state) => {
      state.companies = null
      state.loading = true
    },

    SingleCompany: (state, action: PayloadAction<Company>) => {
      state.singleCompany = action.payload
      state.loading = false
    },
    noSingleCompany: (state) => {
      state.singleCompany = null
      state.loading = true
    }
  }

});

export const { getAllCompanies, SingleCompany, noAllCompanies, noSingleCompany } = companiesRwducer.actions;
