// import { createStore } from "redux"
// import { setUserReducer } from "./reducers/setUserReducer"

// export const configureStore = () => createStore(setUserReducer)


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"

export const store = configureStore({
    reducer: {
        userlol2: userReducer
    }
})