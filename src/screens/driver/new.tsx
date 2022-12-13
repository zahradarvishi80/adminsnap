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
import { DriverForm } from "@taban/forms";
import { Driver } from "@taban/api";
import { useAppNavigate } from "@taban/route";
import { BreadCrumb, Wrapper } from "@taban/component";

export const New = () => {
    const [showToast, setShowToast] = useState<boolean>(false);

    const { t } = useTranslation("driver");

    const user = useAppSelector(User.selectUser);
    const dispatch = useAppDispatch();

    const navigation = useAppNavigate();
    const crumbs = [
        { name: t(""), href: "" },

        { name: t("home"), href: "/" },
        { name: t("driver"), href: "/driver" },
        { name: t("buttonNewDriverTitle"), href: "#" },
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
    console.log(user.token?.apiToken);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                <section className="d-flex justify-content-center align-items-center ">
                    <section className="col-11 col-lg-7">
                        <Formik<DriverForm.FormValues>
                            validationSchema={DriverForm.ValidationSchema(t)}
                            initialValues={{
                                username: "",
                                phoneNumber: "",
                                firstName: "",
                                lastName: "",
                                nationalNumber: "",
                                address: "",
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
                                })
                                    .then((data) => {
                                        dispatch(Global.setLoaderDown());
                                        navigation("/driver");
                                    })
                                    .catch(() => {
                                        dispatch(Global.setLoaderDown());
                                        setShowToast(true);
                                    });
                            }}
                            component={(props: any) => (
                                <DriverForm.SignUpForm
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
