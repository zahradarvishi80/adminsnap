import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { UserStateType } from "../type";
import { Auth } from "@taban/api";
import { FormValues } from "@taban/forms/login";

export const reducer = (builder: ActionReducerMapBuilder<UserStateType>) => {
    builder
        .addCase(Action.pending, (state) => {
            state.loginProcessStatus = "loading";
        })
        .addCase(Action.fulfilled, (state, action) => {
            state.loginProcessStatus = "idle";
            state.value.token = action.payload;
        })
        .addCase(Action.rejected, (state, action) => {
            console.log("action payload ", action, state);
            state.loginProcessStatus = "failed";
        });
};

export const Action = createAsyncThunk(
    "user/login",
    async (formValues: FormValues, { rejectWithValue }) => {
        try {
            const response = await Auth.Login(
                formValues.username,
                formValues.password,
            );
            // The value we return becomes the `fulfilled` action payload
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
