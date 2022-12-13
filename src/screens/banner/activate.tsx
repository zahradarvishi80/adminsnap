import React from "react";
import { useTranslation } from "react-i18next";

import { Banner } from "@taban/api";
import { useAppSelector, User } from "@taban/redux-config";
import { useAppParam } from "@taban/route";
import { AlertComponent } from "@taban/component";

export const Activate = () => {
    const { t } = useTranslation("banner");

    const user = useAppSelector(User.selectUser);

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    return (
        <AlertComponent
            description={t("bannerDescriptionActivate")}
            alertType="active"
            api={Banner.Activate}
            targetId={targetId}
            user={user}
        />
    );
};
