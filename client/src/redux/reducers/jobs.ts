import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobReducerInitialState, Jobs } from "../../vite-env";

const initialState: JobReducerInitialState = {
  jobs: null,
  loading: true,
};

export const jobsReducer = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    getAllJobs: (state, action: PayloadAction<Jobs[]>) => {
      state.jobs = action.payload;
      state.loading = false;
    },

    noJobs: (state) => {
      state.jobs = null;
      state.loading = true;
    },
  },
});

export const {getAllJobs,noJobs} = jobsReducer.actions
