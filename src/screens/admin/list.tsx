import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Admin } from "@taban/api";
import { PaginationType, AdminType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    AppPagination,
    AdminsList,
    Wrapper,
    BreadCrumb,
} from "@taban/component";
import { useAppPagination } from "@taban/route";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";

export const List: React.FC<{}> = () => {
    const [admins, setAdmins] = useState<AdminType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>(
        useAppPagination(),
    );

    const { t } = useTranslation("admin");

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("admin"), href: "#" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        Admin.GetList(user, pagination).then((data: any) => {
            setAdmins(data.admin);
            setPagination(data.pagination);
            dispatch(setLoaderDown());
        });
    }, [user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                <AdminsList items={admins} />
                {admins.length > 0 && <AppPagination pagination={pagination} />}
            </Wrapper>
        </>
    );
};
