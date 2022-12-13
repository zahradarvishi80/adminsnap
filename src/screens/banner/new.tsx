import React from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import {
    useAppDispatch,
    useAppSelector,
    User,
    Global,
} from "@taban/redux-config";
import { BannerForm } from "@taban/forms";
import { Banner } from "@taban/api";
import { useAppNavigate } from "@taban/route";
import { Wrapper, BreadCrumb } from "@taban/component";

export const New = () => {
    const { t } = useTranslation("banner");

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const navigate = useAppNavigate();

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("setting"), href: "#" },
        { name: t("banner"), href: "/setting/banner" },
        { name: t("buttonNewBannerTitle"), href: "#" },
    ];

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />
            <Wrapper>
                <section className="d-flex justify-content-center align-items-center">
                    <section className="col-11 col-lg-7">
                        <Formik<BannerForm.FormValues>
                            validationSchema={BannerForm.ValidationSchema}
                            initialValues={{
                                title: "",
                                contents: {
                                    hash: "",
                                    id: 0,
                                    link: "",
                                    path: "",
                                    status: "",
                                    type: "",
                                },
                            }}
                            onSubmit={(event) => {
                                dispatch(Global.setLoaderUp());
                                Banner.Create(user, {
                                    id: 0,
                                    content: event.contents,
                                    title: event.title,
                                    status: "banner_activate",
                                }).then((data) => {
                                    dispatch(Global.setLoaderDown());
                                    navigate(`/setting/banner`);
                                });
                            }}
                            component={(props: any) => (
                                <BannerForm.CreateForm
                                    submitTxt={t("SubmitTextButton")}
                                    {...props}
                                />
                            )}
                        />
                    </section>
                </section>
            </Wrapper>
        </>
    );
};
