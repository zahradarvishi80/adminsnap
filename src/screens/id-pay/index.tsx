import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import {
    useAppDispatch,
    useAppSelector,
    User,
    Global,
} from "@taban/redux-config";
import { IdPayForm } from "@taban/forms";
import { IdPayApi } from "@taban/api";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { useAppNavigate } from "@taban/route";
import { Wrapper, BreadCrumb } from "@taban/component";

export const IdPay = () => {
    const { t } = useTranslation("sms");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("idPay"), href: "#" },
    ];

    const [idPay, setIdPay] = useState<string>("");

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const navigate = useAppNavigate();

    useEffect(() => {
        dispatch(setLoaderUp());
        IdPayApi.Get(user).then((data: any) => {
            setIdPay(data.idPay);
            dispatch(setLoaderDown());
        });
    }, [user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                {idPay.length > 0 && (
                    <section className="d-flex justify-content-center align-items-center">
                        <section className="col-11 col-lg-7">
                            <Formik<IdPayForm.FormValues>
                                validationSchema={IdPayForm.ValidationSchema(t)}
                                initialValues={{
                                    token: idPay,
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    IdPayApi.Create(user, event.token).then(
                                        () => {
                                            dispatch(Global.setLoaderDown());
                                            navigate(`/`);
                                        },
                                    );
                                }}
                                component={(props: any) => (
                                    <IdPayForm.CreateForm
                                        submitTxt={t("SubmitTextButton")}
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
