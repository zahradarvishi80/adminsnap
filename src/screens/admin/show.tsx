import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Admin } from "@taban/api";
import { AdminType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { useAppParam, useAppLocation } from "@taban/route";
import { Notfound, BreadCrumb, Wrapper } from "@taban/component";

export const Show: React.FC<{}> = () => {
    const { t } = useTranslation("admin");

    const [admin, setAdmin] = useState<AdminType>({
        id: 0,
        username: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        address: "",
        nationalNumber: "",
        status: "active",
        roles: "",
    });
    const [showNotFound, setNotFound] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    const { state }: any = useAppLocation();

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("admin"), href: "/admin" },

        { name: t("admin_number") + Number(id).toString(), href: "#" },
    ];

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            setNotFound(false);

            Admin.Get(user, targetId).then((data: any) => {
                setAdmin(data);
                dispatch(setLoaderDown());
            });
        }
    }, [user]);

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());

            Admin.Get(user, targetId)
                .then((data: any) => {
                    setAdmin(data?.admin);
                    dispatch(setLoaderDown());
                })
                .catch((data) => {
                    dispatch(setLoaderDown());
                    const code = data.response.status;
                    if (code === 404) {
                        setNotFound(true);
                    }
                });
        }
    }, [user, targetId]);

    return (
        <>
            {showNotFound ? (
                <Notfound />
            ) : (
                <>
                    <BreadCrumb breadcrumb={crumbs} />
                    <Wrapper>
                        {state ? (
                            <>
                                <h4>
                                    {t("typographyFirstTitleDetails")}:{" "}
                                    {state.username}
                                </h4>
                                <h4>
                                    {t("typographySecondTitleDetails")}:{" "}
                                    {state.id}
                                </h4>
                                <h4>
                                    {t("typographySevenTitleDetails")}:{" "}
                                    {state.phone_number}
                                </h4>
                                <h4>
                                    {t("typographyThirdTitleDetails")}:{" "}
                                    {state.first_name}
                                </h4>
                                <h4>
                                    {t("typographyFourthTitleDetails")}:{" "}
                                    {state.last_name}
                                </h4>
                                <h4>
                                    {t("typographyFiveTitleDetails")}:{" "}
                                    {state.national_number}
                                </h4>
                                <h4>
                                    {t("typographySixTitleDetails")}:{" "}
                                    {state.address}
                                </h4>
                                <h4>
                                    {t("typographyEightTitleDetails")}:{" "}
                                    {state.roles}
                                </h4>
                            </>
                        ) : (
                            admin.username && (
                                <>
                                    <h4>
                                        {t("typographyFirstTitleDetails")}:{" "}
                                        {admin.username}
                                    </h4>
                                    <h4>
                                        {t("typographySecondTitleDetails")}:{" "}
                                        {admin.id}
                                    </h4>
                                    <h4>
                                        {t("typographySevenTitleDetails")}:{" "}
                                        {admin.phoneNumber}
                                    </h4>
                                    <h4>
                                        {t("typographyThirdTitleDetails")}:{" "}
                                        {admin.firstName}
                                    </h4>
                                    <h4>
                                        {t("typographyFourthTitleDetails")}:{" "}
                                        {admin.lastName}
                                    </h4>
                                    <h4>
                                        {t("typographyFiveTitleDetails")}:{" "}
                                        {admin.nationalNumber}
                                    </h4>
                                    <h4>
                                        {t("typographySixTitleDetails")}:{" "}
                                        {admin.address}
                                    </h4>
                                    <h4>
                                        {t("typographyEightTitleDetails")}:{" "}
                                        {admin.roles}
                                    </h4>
                                </>
                            )
                        )}
                    </Wrapper>
                </>
            )}
        </>
    );
};
