import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Banner } from "@taban/api";
import { PaginationType, BannerType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    AppPagination,
    BannerList,
    Wrapper,
    BreadCrumb,
} from "@taban/component";
import { useAppPagination } from "@taban/route";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";

export const List: React.FC<{}> = () => {
    const [banners, setBanners] = useState<BannerType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>(
        useAppPagination(),
    );

    const user = useAppSelector(User.selectUser);

    const dispatch = useAppDispatch();

    const { t } = useTranslation("banner");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("setting"), href: "#" },
        { name: t("banner"), href: "#" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        Banner.GetList(user, pagination).then((data: any) => {
            setBanners(data.banner);
            setPagination(data.pagination);
            dispatch(setLoaderDown());
        });
    }, [user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />
            <Wrapper>
                <BannerList items={banners} />
                {banners.length > 0 && (
                    <AppPagination pagination={pagination} />
                )}
            </Wrapper>
        </>
    );
};
