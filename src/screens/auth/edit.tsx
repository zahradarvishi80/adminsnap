import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import {
    useAppDispatch,
    useAppSelector,
    User,
    Global,
} from "@taban/redux-config";
import { AuthForm } from "@taban/forms";
import { Auth } from "@taban/api";
import { useAppLocation, useAppNavigate } from "@taban/route";
import { AdminType } from "@taban/dto";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { Wrapper, BreadCrumb } from "@taban/component";

export const Edit = () => {
    const [auth, setAuth] = useState<AdminType>({
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

    const { t } = useTranslation("navbar");

    const user = useAppSelector(User.selectUser);

    const dispatch = useAppDispatch();

    const navigation = useAppNavigate();

    const { state }: any = useAppLocation();

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("admin"), href: "/admin" },
        { name: t("edit"), href: "#" },
    ];

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            Auth.Get(user).then((data: any) => {
                setAuth(data.admin);
                dispatch(setLoaderDown());
            });
        }
    }, []);

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            Auth.Get(user).then((data: any) => {
                setAuth(data.admin);
                dispatch(setLoaderDown());
            });
        }
    }, [user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                {state ? (
                    <section className="d-flex justify-content-center align-items-center taban-h-100">
                        <section className="col-11 col-lg-7">
                            <Formik<AuthForm.FormValues>
                                validationSchema={AuthForm.ValidationSchema(t)}
                                initialValues={{
                                    username: state.username,
                                    phone_number: state.phone_number,
                                    first_name: state.first_name,
                                    last_name: state.last_name,
                                    national_number: state.national_number,
                                    address: state.address,
                                    roles: state.roles,
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    Auth.Edit(user, {
                                        first_name: event.first_name,
                                        last_name: event.last_name,
                                        address: event.address,
                                    }).then((data) => {
                                        dispatch(Global.setLoaderDown());
                                        dispatch(User.AuthAdminAction(user));

                                        navigation(`/`);
                                    });
                                }}
                                component={(props: any) => (
                                    <AuthForm.EditForm
                                        submitTxt={t("SubmitText")}
                                        {...props}
                                    />
                                )}
                            />
                        </section>
                    </section>
                ) : (
                    <>
                        {auth.firstName && (
                            <section className="d-flex justify-content-center align-items-center taban-h-100">
                                <section className="col-11 col-lg-7">
                                    <Formik<AuthForm.FormValues>
                                        validationSchema={AuthForm.ValidationSchema(
                                            t,
                                        )}
                                        initialValues={{
                                            username: auth.username,
                                            phone_number: auth.phoneNumber,
                                            first_name: auth.firstName,
                                            last_name: auth.lastName,
                                            national_number:
                                                auth.nationalNumber,
                                            address: auth.address,
                                            roles: auth.roles,
                                        }}
                                        onSubmit={(event) => {
                                            dispatch(Global.setLoaderUp());
                                            Auth.Edit(user, {
                                                first_name: event.first_name,
                                                last_name: event.last_name,
                                                address: event.address,
                                            }).then((data) => {
                                                dispatch(
                                                    Global.setLoaderDown(),
                                                );
                                                navigation(`/`);
                                            });
                                        }}
                                        component={(props: any) => (
                                            <AuthForm.EditForm
                                                submitTxt={t("SubmitText")}
                                                {...props}
                                            />
                                        )}
                                    />
                                </section>
                            </section>
                        )}
                    </>
                )}
            </Wrapper>
        </>
    );
};
