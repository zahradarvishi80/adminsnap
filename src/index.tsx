import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as Screen from "@taban/screens";
import { AppRouter } from "@taban/route";
import { AppContainer } from "@taban/redux-config";

import "./index.scss";
import "./i18n";
import "./sentry";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <React.Suspense fallback={<Screen.Loader.Loader />}>
            <AppContainer>
                <AppRouter />
            </AppContainer>
        </React.Suspense>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
