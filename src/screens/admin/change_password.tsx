import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import { Wrapper, BreadCrumb } from "@taban/component";
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

export const ChangePassword = () => {
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

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const { state }: any = useAppLocation();

    const navigate = useAppNavigate();

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("admin"), href: "/admin" },
        { name: t("admin_number") + targetId.toString(), href: "#" },
        { name: t("changePassword"), href: "#" },
    ];

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
                    <section className="d-flex justify-content-center align-items-center  ">
                        <section className="col-11 col-lg-7">
                            <Formik<AdminForm.FormValuesChangePassword>
                                validationSchema={AdminForm.ValidationSchemaChangePassword(
                                    t,
                                )}
                                initialValues={{
                                    username: state.username,
                                    password: "",
                                    newPassword: "",
                                    passwordConfirmation: "",
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    Admin.ChangePassword(user, {
                                        username: state.username,
                                        password: event.passwordConfirmation,
                                    }).then((data) => {
                                        console.log(data);
                                        dispatch(Global.setLoaderDown());
                                        navigate(`/admin`);
                                    });
                                }}
                                component={(props: any) => (
                                    <AdminForm.CreateFormChangePassword
                                        submitTxt={t(
                                            "submitTextChangePasswordButton",
                                        )}
                                        {...props}
                                    />
                                )}
                            />
                        </section>
                    </section>
                ) : (
                    <section className="d-flex justify-content-center align-items-center  border ">
                        <section className="col-11 col-lg-7">
                            <Formik<AdminForm.FormValuesChangePassword>
                                validationSchema={AdminForm.ValidationSchemaChangePassword(
                                    t,
                                )}
                                initialValues={{
                                    username: admin.username,
                                    password: "",
                                    newPassword: "",
                                    passwordConfirmation: "",
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    Admin.ChangePassword(user, {
                                        username: admin.username,
                                        password: event.passwordConfirmation,
                                    }).then((data: any) => {
                                        dispatch(Global.setLoaderDown());
                                        navigate(`/admin/${data.admin.id}`);
                                    });
                                }}
                                component={(props: any) => (
                                    <AdminForm.CreateFormChangePassword
                                        submitTxt={t(
                                            "submitTextChangePasswordButton",
                                        )}
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
