import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer, persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default local storage for web
import { jobs } from './api/jobsApi';
import { user } from './api/userApi';
import { jobsReducer } from './reducers/jobs';
import { userReducer } from './reducers/user';



const persistConfig = {
  key: 'root',  
  storage,     
  // whitelist: ['userReducer', 'jobsReducer'],
  version: 1,
};

const rootReducer = combineReducers({
  //*---------------------------- APIs-------------------------------
  [user.reducerPath]: user.reducer,
  [jobs.reducerPath]: jobs.reducer,
  
  //*---------------------------- REDUCERS-------------------------------

  [userReducer.name]: persistReducer(persistConfig, userReducer.reducer),
  [jobsReducer.name]: persistReducer(persistConfig, jobsReducer.reducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gdm) =>  gdm({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(user.middleware,jobs.middleware),
});

export const persistor = persistStore(store);







// export const store = configureStore({
//   reducer: {
//     //*---------------------------- APIs-------------------------------
 
//     [user.reducerPath]: user.reducer,

//     [jobs.reducerPath]:jobs.reducer,
    
// //*---------------------------- REDUCERS-------------------------------
//     [userReducer.name]: userReducer.reducer,

//     [jobsReducer.name]:jobsReducer.reducer
//   },
//   middleware: (gdm) => gdm().concat(user.middleware,jobs.middleware),
// });