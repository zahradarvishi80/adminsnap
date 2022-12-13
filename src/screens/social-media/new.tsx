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
import { SocialMedia } from "@taban/api";
import { useAppNavigate } from "@taban/route";
import { Wrapper, BreadCrumb } from "@taban/component";

export const New = () => {
    const { t } = useTranslation("social_media");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("socialMedia"), href: "/setting/social-media" },
        { name: t("buttonNewSocialMediaTitle"), href: "#" },
    ];

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const navigate = useAppNavigate();

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                <section className="d-flex justify-content-center align-items-center">
                    <section className="col-11 col-lg-7">
                        <Formik<BannerForm.FormValues>
                            validationSchema={BannerForm.ValidationSchema(t)}
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
                                SocialMedia.Create(user, {
                                    id: 0,
                                    content: event.contents,
                                    title: event.title,
                                    status: "social_media_activate",
                                }).then((data) => {
                                    dispatch(Global.setLoaderDown());
                                    navigate(`/setting/social-media`);
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
