import { configureStore } from "@reduxjs/toolkit";
import { user } from "./api/userApi";
import { userReducer } from "./reducers/user";

export const store = configureStore({
  reducer: {
    [user.reducerPath]: user.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (gdm) => gdm().concat(user.middleware),
});
