import React, { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";
import { ListGroup } from "react-bootstrap";

import { UserApi } from "@taban/api";
import { UserType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { useAppParam, useAppLocation } from "@taban/route";
import { Notfound, Wrapper, BreadCrumb } from "@taban/component";

export const Show: FC<{}> = () => {
    const [userInfo, setUserInfo] = useState<UserType>({
        id: 0,
        username: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        status: "active",
    });
    const [showNotFound, setNotFound] = useState<boolean>(false);

    const { t } = useTranslation("user");

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    const { state }: any = useAppLocation();

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("user"), href: "/user" },
        { name: t("userId") + targetId.toString(), href: "#" },
    ];

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());

            setNotFound(false);

            UserApi.Get(user, targetId).then((data: any) => {
                setUserInfo(data?.user);
                dispatch(setLoaderDown());
            });
        }
    }, []);

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());

            UserApi.Get(user, targetId)
                .then((data: any) => {
                    setUserInfo(data?.user);
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
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h4>
                                            {t("typographyFirstTitleDetails")}:{" "}
                                            {state.username}
                                        </h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h4>
                                            {t("typographySecondTitleDetails")}:{" "}
                                            {state.id}
                                        </h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h4>
                                            {t("typographySevenTitleDetails")}:{" "}
                                            {state.phoneNumber}
                                        </h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h4>
                                            {t("typographyThirdTitleDetails")}:{" "}
                                            {state.firstName}
                                        </h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h4>
                                            {t("typographyFourthTitleDetails")}:{" "}
                                            {state.lastName}
                                        </h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h4>
                                            {t("typographyFiveTitleDetails")}:{" "}
                                            {state.nationalNumber}
                                        </h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {" "}
                                        <h4>
                                            {t("typographySixTitleDetails")}:{" "}
                                            {state.address}
                                        </h4>
                                    </ListGroup.Item>
                                </ListGroup>
                            </>
                        ) : (
                            userInfo.username && (
                                <>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h4>
                                                {t(
                                                    "typographyFirstTitleDetails",
                                                )}
                                                : {userInfo.username}
                                            </h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>
                                                {t(
                                                    "typographySecondTitleDetails",
                                                )}
                                                : {userInfo.id}
                                            </h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>
                                                {t(
                                                    "typographySevenTitleDetails",
                                                )}
                                                : {userInfo.phoneNumber}
                                            </h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>
                                                {t(
                                                    "typographyThirdTitleDetails",
                                                )}
                                                : {userInfo.firstName}
                                            </h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>
                                                {t(
                                                    "typographyFourthTitleDetails",
                                                )}
                                                : {userInfo.lastName}
                                            </h4>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </>
                            )
                        )}
                    </Wrapper>
                </>
            )}
        </>
    );
};
