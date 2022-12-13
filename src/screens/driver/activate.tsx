import React from "react";
import { useTranslation } from "react-i18next";

import { Driver } from "@taban/api";
import { useAppSelector, User } from "@taban/redux-config";
import { useAppParam } from "@taban/route";
import { AlertComponent } from "@taban/component";

export const Activate = () => {
    const { t } = useTranslation("driver");

    const user = useAppSelector(User.selectUser);

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    return (
        <AlertComponent
            description={t("driverDescriptionActivate")}
            alertType="active"
            api={Driver.Activate}
            targetId={targetId}
            user={user}
        />
    );
};
