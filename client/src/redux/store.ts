import { configureStore } from "@reduxjs/toolkit";
import { jobs } from "./api/jobsApi";
import { user } from "./api/userApi";
import { jobsReducer } from "./reducers/jobs";
import { userReducer } from "./reducers/user";

export const store = configureStore({
  reducer: {
    //*---------------------------- APIs-------------------------------
 
    [user.reducerPath]: user.reducer,

    [jobs.reducerPath]:jobs.reducer,
    
//*---------------------------- REDUCERS-------------------------------
    [userReducer.name]: userReducer.reducer,

    [jobsReducer.name]:jobsReducer.reducer
  },
  middleware: (gdm) => gdm().concat(user.middleware,jobs.middleware),
});
