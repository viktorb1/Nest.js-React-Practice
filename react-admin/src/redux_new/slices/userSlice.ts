import { User } from "../../models/user";

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: new User()
}

export const userSlice = createSlice({
    name: 'my random name',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = { 
                ...state.user, 
                ...action.payload 
            };
        },
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
