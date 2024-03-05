import { User } from "../../models/user"

const initialState = {
    user: new User()
}

// similar to javascript's arr.reduce() function, this
// function takes in an initial state (usually the global state of the store) and then transforms it
// in some way as specified by the 'type' field
export const setUserReducer = (state = initialState, action: {type: string, user: User}) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}
// you can combine multiple reducers into a single store using combineReducers
// but all will run