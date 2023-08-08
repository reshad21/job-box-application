import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from './../../../firebase/firebase.config';

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

const createUser = createAsyncThunk("auth/createUser", async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data;
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.email = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.email = "";
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
    }
})

export const { increment } = authSlice.actions
export default authSlice.reducer;