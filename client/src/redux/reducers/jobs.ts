import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobReducerInitialState, Jobs } from "../../vite-env";

const initialState: JobReducerInitialState = {
  jobs: null,
  loading: true,
  getJob: null,
  adminJobs: null,
  adminSingleJob: null

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
      state.loading = true;
      state.jobs = null;
    },


    singleJob: (state, action: PayloadAction<Jobs>) => {
      state.loading = false
      state.getJob = action.payload
    },

    noSingleJob: (state) => {
      state.loading = true
      state.getJob = null;
    },


    adminJobs: (state, action: PayloadAction<Jobs[]>) => {
      state.adminJobs = action.payload
      state.loading = false

    },
    adminSingleJob: (state, action: PayloadAction<Jobs>) => {
      state.adminSingleJob = action.payload;
      state.loading = false
    }


  },
});

export const { getAllJobs, noJobs, singleJob, noSingleJob, adminJobs, adminSingleJob } = jobsReducer.actions
