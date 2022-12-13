import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import {
    useAppDispatch,
    useAppSelector,
    User,
    Global,
} from "@taban/redux-config";
import { DriverForm } from "@taban/forms";
import { Driver } from "@taban/api";
import { useAppLocation, useAppNavigate, useAppParam } from "@taban/route";
import { DriverType } from "@taban/dto";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { BreadCrumb, Wrapper } from "@taban/component";

export const Edit = () => {
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

    const { t } = useTranslation("driver");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("driver"), href: "/driver" },
        { name: t("submitTextEditScreen"), href: "#" },
    ];

    const user = useAppSelector(User.selectUser);
    const dispatch = useAppDispatch();

    const navigation = useAppNavigate();

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    const { state }: any = useAppLocation();

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            Driver.Get(user, targetId).then((data: any) => {
                setDriver(data);
                dispatch(setLoaderDown());
            });
        }
    }, [user]);

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            Driver.Get(user, targetId).then((data: any) => {
                setDriver(data);
                dispatch(setLoaderDown());
            });
        }
    }, [driver, targetId, user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                {state ? (
                    <section className="d-flex justify-content-center align-items-center ">
                        <section className="col-11 col-lg-7">
                            <Formik<DriverForm.FormValues>
                                validationSchema={DriverForm.ValidationSchema(
                                    t,
                                )}
                                initialValues={{
                                    username: state.username,
                                    phoneNumber: state.phoneNumber,
                                    firstName: state.firstName,
                                    lastName: state.lastName,
                                    nationalNumber: state.nationalNumber,
                                    address: state.address,
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    Driver.Create(user, {
                                        id: 0,
                                        username: event.username,
                                        phoneNumber: event.phoneNumber,
                                        firstName: event.firstName,
                                        lastName: event.lastName,
                                        nationalNumber: event.nationalNumber,
                                        address: event.address,
                                        status: "active",
                                        roles: "",
                                    }).then((data) => {
                                        dispatch(Global.setLoaderDown());
                                        navigation(`/driver/${data.driver.id}`);
                                    });
                                }}
                                component={(props: any) => (
                                    <DriverForm.SignUpForm
                                        submitTxt={t("SubmitText")}
                                        {...props}
                                    />
                                )}
                            />
                        </section>
                    </section>
                ) : (
                    <section className="d-flex justify-content-center align-items-center ">
                        <section className="col-11 col-lg-7">
                            <Formik<DriverForm.FormValues>
                                validationSchema={DriverForm.ValidationSchema(
                                    t,
                                )}
                                initialValues={{
                                    username: driver.username,
                                    phoneNumber: driver.phoneNumber,
                                    firstName: driver.firstName,
                                    lastName: driver.lastName,
                                    nationalNumber: driver.nationalNumber,
                                    address: driver.address,
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    Driver.Create(user, {
                                        id: 0,
                                        username: event.username,
                                        phoneNumber: event.phoneNumber,
                                        firstName: event.firstName,
                                        lastName: event.lastName,
                                        nationalNumber: event.nationalNumber,
                                        address: event.address,
                                        status: "active",
                                        roles: "",
                                    }).then((data) => {
                                        dispatch(Global.setLoaderDown());
                                        navigation(`/driver/${data.driver.id}`);
                                    });
                                }}
                                component={(props: any) => (
                                    <DriverForm.SignUpForm
                                        submitTxt={t("submitTextEditScreen")}
                                        {...props}
                                    />
                                )}
                            />
                        </section>
                    </section>
                )}
            </Wrapper>
        </>
    );
};
