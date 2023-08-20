import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from './../../../firebase/firebase.config';

const initialState = {
    user: { email: "", role: "" },
    isLoading: true,
    isError: false,
    error: "",
    searchValue: "",
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

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
    const res = await fetch(`http://localhost:5000/user/${email}`);
    const data = await res.json();

    if (data.status) {
        return data;
    }
    return email;
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = { email: "", role: "" };
        },
        setUser: (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false;
        },
        toggleLoading: (state) => {
            state.isLoading = false;
        },
        searchResult: (state, action) => {
            state.searchValue = action.payload;
        },
        clearSearch: (state) => {
            state.searchValue = "";
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
                state.user.email = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.user.email = "";
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
                state.user.email = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user.email = ""
                state.isLoading = true;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(googleLogin.pending, (state, action) => {
                state.user.email = "";
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.user.email = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.user.email = ""
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(getUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.user = payload.data;
                } else {
                    state.user.email = payload;
                }
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(getUser.rejected, (state, action) => {
                state.user = ""
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
    }
})

export const { logOut, setUser, toggleLoading, searchResult, clearSearch } = authSlice.actions
export default authSlice.reducer;