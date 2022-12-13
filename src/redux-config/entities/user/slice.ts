import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./state";
import { SignUp, Login, AuthAdmin } from "./reducers";

export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        SignUp.reducer(builder);
        Login.reducer(builder);
        AuthAdmin.reducer(builder);
    },
});
export const AuthAdminAction = AuthAdmin.Action;
export const SignUpUserAction = SignUp.SignUpUserAction;
export const LoginUserAction = Login.Action;

export const UserReducer = UserSlice.reducer;
