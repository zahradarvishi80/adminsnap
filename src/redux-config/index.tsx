import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "@taban/redux-config/store";

export const AppContainer = (props: any) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {props?.children}
            </PersistGate>
        </Provider>
    );
};

export * from "./hooks";
export * as User from "./entities/user";
export * as Global from "./entities/global";
export * as AdminTest from "./entities/admin"