import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserReducerInitialState } from "../../vite-env";

const initialState: UserReducerInitialState = {
  loading: true,
  user: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = true;
      state.user = null;
    },
  },
});

export const { userExist, userNotExist } = userReducer.actions;
