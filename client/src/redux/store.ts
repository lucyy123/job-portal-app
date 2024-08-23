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
import storage from 'redux-persist/lib/storage';
// Default local storage for web
import { applications } from './api/applications';
import { companies } from './api/companiesApi';
import { jobs } from './api/jobsApi';
import { user } from './api/userApi';
import { companiesRwducer } from './reducers/companies';
import { jobsReducer } from './reducers/jobs';
import { authTokenReducer } from './reducers/token';
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
  [applications.reducerPath] : applications.reducer,
  [companies.reducerPath]:companies.reducer,
  //*---------------------------- REDUCERS-------------------------------

  [userReducer.name]: persistReducer(persistConfig, userReducer.reducer),
  [jobsReducer.name]: persistReducer(persistConfig, jobsReducer.reducer),
  [authTokenReducer.name]:persistReducer(persistConfig,authTokenReducer.reducer),
  [companiesRwducer.name]:persistReducer(persistConfig,companiesRwducer.reducer)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gdm) =>  gdm({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(user.middleware,jobs.middleware,applications.middleware,companies.middleware),
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