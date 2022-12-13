import React from "react";

import { useAppNavigate } from "@taban/route/hooks";
import { useAppSelector, User } from "@taban/redux-config";

export const Auth = (props: { children?: React.ReactNode }) => {
    const navigate = useAppNavigate();

    const token = useAppSelector(User.selectToken);

    React.useEffect(() => {
        if (token === undefined || token?.apiToken === undefined) {
            navigate("/login", { replace: false });
        }
    });

    return <>{props.children}</>;
};
