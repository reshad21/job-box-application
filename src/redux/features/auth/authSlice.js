import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from './../../../firebase/firebase.config';

const initialState = {
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: ""
};

export const createUser = createAsyncThunk("auth/createUser", async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
})

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
})

export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    return data.user.email;
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.email = "";
        },
        setUser: (state, action) => {
            state.email = action.payload;
            state.isLoading = false;
        },
        toggleLoading: (state) => {
            state.isLoading = !state.isLoading;
        }
    },
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
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.email = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.email = ""
                state.isLoading = true;
                state.isError = false;
                state.error = action.error.message;
            })
            .addCase(googleLogin.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.email = action.payload
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.email = ""
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload.message;
            })
    }
})

export const { logOut, setUser, toggleLoading } = authSlice.actions
export default authSlice.reducer;