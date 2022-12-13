import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import {
    useAppDispatch,
    useAppSelector,
    User,
    Global,
} from "@taban/redux-config";
import { AdminForm } from "@taban/forms";
import { Admin } from "@taban/api";
import { useAppLocation, useAppNavigate, useAppParam } from "@taban/route";
import { AdminType } from "@taban/dto";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { BreadCrumb, Wrapper } from "@taban/component";

export const Edit = () => {
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

    const { t } = useTranslation("admin");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("admin"), href: "/admin" },
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
            Admin.Get(user, targetId).then((data: any) => {
                setAdmin(data);
                dispatch(setLoaderDown());
            });
        }
    }, [user]);

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            Admin.Get(user, targetId).then((data: any) => {
                setAdmin(data);
                dispatch(setLoaderDown());
            });
        }
    }, [admin, targetId, user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                {state ? (
                    <section className="d-flex justify-content-center align-items-center ">
                        <section className="col-11 col-lg-7">
                            <Formik<AdminForm.FormValues>
                                validationSchema={AdminForm.ValidationSchema(t)}
                                initialValues={{
                                    username: state.username,
                                    phoneNumber: state.phoneNumber,
                                    firstName: state.firstName,
                                    lastName: state.lastName,
                                    nationalNumber: state.nationalNumber,
                                    address: state.address,
                                    roles: state.roles,
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    Admin.Create(user, {
                                        id: 0,
                                        username: event.username,
                                        phoneNumber: event.phoneNumber,
                                        firstName: event.firstName,
                                        lastName: event.lastName,
                                        nationalNumber: event.nationalNumber,
                                        address: event.address,
                                        status: "active",
                                        roles: event.roles,
                                    }).then((data) => {
                                        dispatch(Global.setLoaderDown());
                                        navigation(`/admin/${data.admin.id}`);
                                    });
                                }}
                                component={(props: any) => (
                                    <AdminForm.SignUpForm
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
                            <Formik<AdminForm.FormValues>
                                validationSchema={AdminForm.ValidationSchema(t)}
                                initialValues={{
                                    username: admin.username,
                                    phoneNumber: admin.phoneNumber,
                                    firstName: admin.firstName,
                                    lastName: admin.lastName,
                                    nationalNumber: admin.nationalNumber,
                                    address: admin.address,
                                    roles: admin.roles,
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    Admin.Create(user, {
                                        id: 0,
                                        username: event.username,
                                        phoneNumber: event.phoneNumber,
                                        firstName: event.firstName,
                                        lastName: event.lastName,
                                        nationalNumber: event.nationalNumber,
                                        address: event.address,
                                        status: "active",
                                        roles: event.roles,
                                    }).then((data) => {
                                        dispatch(Global.setLoaderDown());
                                        navigation(`/admin/${data.admin.id}`);
                                    });
                                }}
                                component={(props: any) => (
                                    <AdminForm.SignUpForm
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
