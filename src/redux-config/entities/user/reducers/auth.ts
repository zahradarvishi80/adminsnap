import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { UserStateType } from "@taban/redux-config/entities/user/type";
import { Auth } from "@taban/api";
import { UserType } from "@taban/dto";

export const Action = createAsyncThunk(
    "auth/fetchAuthAdmin",
    async (User: UserType, { rejectWithValue }) => {
        try {
            const response = await Auth.Get(User);
            return response.admin;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const reducer = (builder: ActionReducerMapBuilder<UserStateType>) => {
    builder.addCase(Action.fulfilled, (state, action) => {
        state.value.firstName = action.payload.firstName;
        state.value.lastName = action.payload.lastName;
        state.value.username = action.payload.username;
        state.value.phoneNumber = action.payload.phoneNumber;
        state.value.status = action.payload.status;
        state.value.id = action.payload.id;
    });
};
