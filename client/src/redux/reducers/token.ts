import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthTokenInitialState } from "../../vite-env";

const initialState: AuthTokenInitialState = {
    token: null,
    tokenLoading:true
}

export const authTokenReducer = createSlice({
    name: "authToken",
    initialState,
    reducers: {
        setAuthToken : (state,action:PayloadAction<string>)=>{
            state.token = action.payload
            state.tokenLoading=false

        },

        expiredToken:(state)=>{
            state.token=null
            state.tokenLoading=true
        }

    }
});


export const {expiredToken,setAuthToken}= authTokenReducer.actions