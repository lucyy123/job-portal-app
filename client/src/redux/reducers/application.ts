import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApplicationsReducerInitialState,
  ApplicationsRes,
  UserAppliedJobs,
} from "../../vite-env";

const initialState: ApplicationsReducerInitialState = {
  loading: true,
  applications: null,
  applieadJobs:null
};

export const applicationsReducer = createSlice({
  name: "applicationsReducer",
  initialState,
  reducers: {
    getApplicationsOfJobId: (state, action: PayloadAction<ApplicationsRes>) => {
      (state.applications = action.payload), (state.loading = false);
    },
   getApplieadJob:(state,action:PayloadAction<UserAppliedJobs[]> )=>{
   state.applieadJobs= action.payload
   state.loading = false
   }


  },
});


export const {getApplicationsOfJobId, getApplieadJob} = applicationsReducer.actions
