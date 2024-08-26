import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApplicationsReducerInitialState,
  ApplicationsRes,
} from "../../vite-env";

const initialState: ApplicationsReducerInitialState = {
  loading: true,
  applications: null,
};

export const applicationsReducer = createSlice({
  name: "applicationsReducer",
  initialState,
  reducers: {
    getApplicationsOfJobId: (state, action: PayloadAction<ApplicationsRes>) => {
      (state.applications = action.payload), (state.loading = false);
    },
  },
});


export const {getApplicationsOfJobId} = applicationsReducer.actions
