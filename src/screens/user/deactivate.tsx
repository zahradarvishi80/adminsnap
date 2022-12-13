import React from "react";
import { useTranslation } from "react-i18next";

import { UserApi } from "@taban/api";
import { useAppSelector, User } from "@taban/redux-config";
import { useAppParam } from "@taban/route";
import { AlertComponent } from "@taban/component";

export const Deactivate = () => {
    const { t } = useTranslation("user");

    const user = useAppSelector(User.selectUser);

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    return (
        <AlertComponent
            description={t("adminDescriptionDeactivate")}
            alertType="inactive_deactivate"
            api={UserApi.Deactivate}
            targetId={targetId}
            user={user}
        />
    );
};
