


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "@taban/dto";
import { AdminTestRedux } from "../../../api";
import { initialState } from "./state";

export const fetchAdmintest = createAsyncThunk("adminTest", async (user:UserType) => {
return (await AdminTestRedux.AdminTestApi(user)).auth;
});

export const AdminTestSlice = createSlice({
name: "adminTest",
initialState: initialState,
reducers: {},
extraReducers: (builder) => {
    builder.addCase(fetchAdmintest.fulfilled, (state, action) => {
        // console.log(action.payload);
        
    state.value = action.payload;
});
},
});

export const AdminTestReducers = AdminTestSlice.reducer;