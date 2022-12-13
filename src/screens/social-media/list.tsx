import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { SocialMedia } from "@taban/api";
import { PaginationType, SocialMediaType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    AppPagination,
    SocialMedialList,
    BreadCrumb,
    Wrapper,
} from "@taban/component";
import { useAppPagination } from "@taban/route";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";

export const List: React.FC<{}> = () => {
    const [socialMedias, setSocialMedias] = useState<SocialMediaType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>(
        useAppPagination(),
    );

    const user = useAppSelector(User.selectUser);

    const dispatch = useAppDispatch();

    const { t } = useTranslation("social_media");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("socialMedia"), href: "#" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        SocialMedia.GetList(user, pagination).then((data: any) => {
            setSocialMedias(data.socialMedia);
            setPagination(data.pagination);
            dispatch(setLoaderDown());
        });
    }, [user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                <SocialMedialList items={socialMedias} />
                {socialMedias.length > 0 && (
                    <AppPagination pagination={pagination} />
                )}
            </Wrapper>
        </>
    );
};
