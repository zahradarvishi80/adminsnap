import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import type { RootState as RootState1 } from "@taban/redux-config/state";
import RootReducer from "@taban/redux-config/root-reducer";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = RootState1;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
