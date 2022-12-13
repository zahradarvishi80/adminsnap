import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";

import { UserStateType } from "@taban/redux-config/entities/user/type";
import { signUpUserApi } from "@taban/api";
import { FormValues } from "@taban/forms/signup";
import { UserType } from "@taban/dto";

export const reducer = (builder: ActionReducerMapBuilder<UserStateType>) => {
    builder
        .addCase(SignUpUserAction.pending, (state) => {
            state.loginProcessStatus = "loading";
        })
        .addCase(SignUpUserAction.fulfilled, (state, action) => {
            state.loginProcessStatus = "idle";
        })
        .addCase(SignUpUserAction.rejected, (state, action) => {
            console.log("action payload ", action, state);
            state.loginProcessStatus = "failed";
        });
};

export const SignUpUserAction = createAsyncThunk(
    "user/signup",
    async (formValues: FormValues, { rejectWithValue }) => {
        try {
            const response = await signUpUserApi(
                castFormValueToUserAbject(formValues),
            );
            // The value we return becomes the `fulfilled` action payload
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const castFormValueToUserAbject = (formValue: FormValues): UserType => {
    return {
        username: formValue.phoneNumber,
        phoneNumber: formValue.phoneNumber,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        status: "active",
        id: formValue.id,
    };
};
