import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./state";
import { GlobalStateType } from "./type";

export const GlobalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setLoaderUp: (state: GlobalStateType) => {
            state.loader = true;
        },
        setLoaderDown: (state: GlobalStateType) => {
            state.loader = false;
        },
    },
});

export const { setLoaderUp, setLoaderDown } = GlobalSlice.actions;

export const GlobalReducer = GlobalSlice.reducer;
