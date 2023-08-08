import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: ""
};

// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "addtocart":
//             return {

//             }

//         default:
//             return {
//                 state
//             }
//     }
// }

// const [state,dispatch] = useReducer(initialState,reducer);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        increment: (state, action) => { }
    }
})

export const { increment } = authSlice.actions
export default authSlice.reducer;