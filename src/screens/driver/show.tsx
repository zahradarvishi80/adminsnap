import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Driver } from "@taban/api";
import { DriverType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { useAppParam, useAppLocation } from "@taban/route";
import { Notfound, BreadCrumb, Wrapper } from "@taban/component";

export const Show: React.FC<{}> = () => {
    const { t } = useTranslation("driver");

    const [driver, setDriver] = useState<DriverType>({
        id: 0,
        username: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        address: "",
        nationalNumber: "",
        status: "active",
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
        { name: t("driver"), href: "/driver" },

        { name: t("driver_number") + Number(id).toString(), href: "#" },
    ];

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            setNotFound(false);

            Driver.Get(user, targetId).then((data: any) => {
                setDriver(data);
                dispatch(setLoaderDown());
            });
        }
    }, [user]);

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());

            Driver.Get(user, targetId)
                .then((data: any) => {
                    setDriver(data?.driver);
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
                                    {state.phoneNumber}
                                </h4>
                                <h4>
                                    {t("typographyThirdTitleDetails")}:{" "}
                                    {state.firstName}
                                </h4>
                                <h4>
                                    {t("typographyFourthTitleDetails")}:{" "}
                                    {state.lastName}
                                </h4>
                                <h4>
                                    {t("typographyFiveTitleDetails")}:{" "}
                                    {state.nationalNumber}
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
                            driver.username && (
                                <>
                                    <h4>
                                        {t("typographyFirstTitleDetails")}:{" "}
                                        {driver.username}
                                    </h4>
                                    <h4>
                                        {t("typographySecondTitleDetails")}:{" "}
                                        {driver.id}
                                    </h4>
                                    <h4>
                                        {t("typographySevenTitleDetails")}:{" "}
                                        {driver.phoneNumber}
                                    </h4>
                                    <h4>
                                        {t("typographyThirdTitleDetails")}:{" "}
                                        {driver.firstName}
                                    </h4>
                                    <h4>
                                        {t("typographyFourthTitleDetails")}:{" "}
                                        {driver.lastName}
                                    </h4>
                                    <h4>
                                        {t("typographyFiveTitleDetails")}:{" "}
                                        {driver.nationalNumber}
                                    </h4>
                                    <h4>
                                        {t("typographySixTitleDetails")}:{" "}
                                        {driver.address}
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
