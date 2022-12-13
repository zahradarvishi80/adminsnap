import React from "react";

import logo from "@taban/assets/logo.svg";

export const Loader: React.FC<{}> = () => {
    return (
        <div className="app-loader">
            <img src={logo} className="app-loader-logo" alt="logo" />
            <span className="app-loader-text">LOADING...</span>
        </div>
    );
};
