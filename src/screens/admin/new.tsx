import React, { useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Toast, ToastContainer } from "react-bootstrap";

import {
    useAppDispatch,
    useAppSelector,
    User,
    Global,
} from "@taban/redux-config";
import { AdminForm } from "@taban/forms";
import { Admin } from "@taban/api";
import { useAppNavigate } from "@taban/route";
import { BreadCrumb, Wrapper } from "@taban/component";

export const New = () => {
    const [showToast, setShowToast] = useState<boolean>(false);

    const { t } = useTranslation("admin");

    const user = useAppSelector(User.selectUser);
    const dispatch = useAppDispatch();

    const navigation = useAppNavigate();
    const crumbs = [
        { name: t(""), href: "" },

        { name: t("home"), href: "/" },
        { name: t("admin"), href: "/admin" },
        { name: t("buttonNewAdminTitle"), href: "#" },
    ];

    const renderModal = () => (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                className="d-inline-block m-1"
                bg="danger"
                show={showToast}
                onClose={() => setShowToast(false)}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">
                        {t("toastTitleErrorMessage")}
                    </strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                    {t("toastDescriptionErrorMessage")}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                <section className="d-flex justify-content-center align-items-center ">
                    <section className="col-11 col-lg-7">
                        <Formik<AdminForm.FormValues>
                            validationSchema={AdminForm.ValidationSchema(t)}
                            initialValues={{
                                username: "",
                                phoneNumber: "",
                                firstName: "",
                                lastName: "",
                                nationalNumber: "",
                                address: "",
                                roles: "",
                            }}
                            onSubmit={(event) => {
                                console.log(event);

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
                                })
                                    .then((data) => {
                                        dispatch(Global.setLoaderDown());
                                        navigation("/admin");
                                    })
                                    .catch(() => {
                                        dispatch(Global.setLoaderDown());
                                        setShowToast(true);
                                    });
                            }}
                            component={(props: any) => (
                                <AdminForm.SignUpForm
                                    submitTxt={t("SubmitText")}
                                    {...props}
                                />
                            )}
                        />
                        {renderModal()}
                    </section>
                </section>
            </Wrapper>
        </>
    );
};
