import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import { LoginForm } from "@taban/forms";
import { useAppNavigate } from "@taban/route";
import logo from "@taban/assets/logo.svg";
import { Wrapper, Toast } from "@taban/component";
export const Login = () => {
    const [showNotToast, setNotToast] = useState<boolean>(false);

    const { t } = useTranslation("login");

    const dispatch = useAppDispatch();
    const navigate = useAppNavigate();

    const token = useAppSelector(User.selectToken);

    useEffect(() => {
        if (token !== undefined && token.apiToken !== undefined) {
            navigate("/", { replace: false });
        }
    }, [token, navigate]);

    return (
        <>
            <Wrapper className="mt-5">
                <section
                    className="d-flex justify-content-center align-items-center py-5"
                    style={{ height: "80vh" }}
                >
                    <section className="col-11 col-lg-7">
                        <div className="d-flex justify-content-center">
                            <img
                                src={logo}
                                alt=""
                                className="img-thumbnail col-3"
                            />
                        </div>
                        <Formik<LoginForm.FormValues>
                            validationSchema={LoginForm.LoginValidationSchema(
                                t,
                            )}
                            initialValues={{
                                username: "",
                                password: "",
                            }}
                            onSubmit={(event) => {
                                dispatch(User.LoginUserAction(event)).then(() =>
                                    setNotToast(true),
                                );
                            }}
                            component={(props: any) => (
                                <LoginForm.LoginForm
                                    submitTxt={t("logIn")}
                                    {...props}
                                />
                            )}
                        />
                    </section>
                </section>
            </Wrapper>
            {showNotToast && (
                <Toast
                    setNotToast={setNotToast}
                    showNotToast={showNotToast}
                    t={t}
                />
            )}
        </>
    );
};
