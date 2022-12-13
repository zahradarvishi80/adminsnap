import React from "react";
import { useTranslation } from "react-i18next";

import { Banner } from "@taban/api";
import { useAppSelector, User } from "@taban/redux-config";
import { useAppParam } from "@taban/route";
import { AlertComponent } from "@taban/component";

export const Deactivate = () => {
    const { t } = useTranslation("banner");

    const user = useAppSelector(User.selectUser);

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    return (
        <AlertComponent
            description={t("bannerDescriptionDeactivate")}
            alertType="inactive_deactivate"
            api={Banner.Deactivate}
            targetId={targetId}
            user={user}
        />
    );
};
