import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import {
    useAppDispatch,
    useAppSelector,
    User,
    Global,
} from "@taban/redux-config";
import { SMSForm } from "@taban/forms";
import { SMSApi } from "@taban/api";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { SMSType } from "@taban/dto";
import { useAppNavigate } from "@taban/route";
import { Wrapper, BreadCrumb } from "@taban/component";

export const SMS = () => {
    const { t } = useTranslation("sms");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("sms"), href: "#" },
    ];

    const [sms, setSMS] = useState<SMSType>({
        token: "",
        sender: "",
    });

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const navigate = useAppNavigate();

    useEffect(() => {
        dispatch(setLoaderUp());
        SMSApi.Get(user).then((data: any) => {
            setSMS(data.sms);
            dispatch(setLoaderDown());
        });
    }, [user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                {sms.token.length > 0 && (
                    <section className="d-flex justify-content-center align-items-center">
                        <section className="col-11 col-lg-7">
                            <Formik<SMSForm.FormValues>
                                validationSchema={SMSForm.ValidationSchema(t)}
                                initialValues={{
                                    token: sms.token,
                                    sender: sms.sender,
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    SMSApi.Edit(user, {
                                        token: event.token,
                                        sender: event.sender,
                                    }).then(() => {
                                        dispatch(Global.setLoaderDown());
                                        navigate(`/`);
                                    });
                                }}
                                component={(props: any) => (
                                    <SMSForm.CreateForm
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
