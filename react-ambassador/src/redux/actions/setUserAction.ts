import { User } from "../../models/user";

// this simplies the api so you don't have to write out
// type: "SET_USER" each time you use dispatch()
// type also sets the type of action this object will trigger in the reducer
export const setUser = (user: User) => ({
    type: 'SET_USER',
    user
})