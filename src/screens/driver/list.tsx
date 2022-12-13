import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Driver } from "@taban/api";
import { PaginationType, DriverType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    AppPagination,
    DriverList,
    Wrapper,
    BreadCrumb,
} from "@taban/component";
import { useAppPagination } from "@taban/route";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";

export const List: React.FC<{}> = () => {
    const [drivers, setDrivers] = useState<DriverType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>(
        useAppPagination(),
    );

    const { t } = useTranslation("driver");

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("driver"), href: "#" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        Driver.GetList(user, pagination).then((data: any) => {
            console.log(data.driver);

            setDrivers(data.driver);
            // setPagination(data.pagination);
            dispatch(setLoaderDown());
        });
    }, [user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />
            <Wrapper>
                <DriverList items={drivers} />
                {drivers.length > 0 && (
                    <AppPagination pagination={pagination} />
                )}
            </Wrapper>
        </>
    );
};
