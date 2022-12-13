import React from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import {
    useAppDispatch,
    useAppSelector,
    User,
    Global,
} from "@taban/redux-config";
import { CategoryForm } from "@taban/forms";
import { Category } from "@taban/api";
import { useAppLocation, useAppNavigate } from "@taban/route";
import { Wrapper, BreadCrumb } from "@taban/component";

export const New = () => {
    const { t } = useTranslation("category");

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const navigate = useAppNavigate();

    const { state }: any = useAppLocation();

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("category"), href: "/category" },
        { name: t("buttonNewCategoryTitle"), href: "/#" },
    ];

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />
            <Wrapper>
                <section className="d-flex justify-content-center align-items-center taban-h-100">
                    <section className="col-11 col-lg-7">
                        <Formik<CategoryForm.FormValues>
                            validationSchema={CategoryForm.ValidationSchema(t)}
                            initialValues={{
                                title: "",
                                description: "",
                                contents: [],
                            }}
                            onSubmit={(event) => {
                                dispatch(Global.setLoaderUp());
                                Category.Create(user, {
                                    id: 0,
                                    status: "activate",
                                    title: event.title,
                                    description: event.description,
                                    parent_id: state.id,
                                    top_parent_id: state.top_parent_id,
                                    contents: event.contents[0],
                                }).then((data) => {
                                    dispatch(Global.setLoaderDown());
                                    navigate(
                                        `/category/${data?.category?.parent_id}/children`,
                                    );
                                });
                            }}
                            component={(props: any) => (
                                <CategoryForm.CreateForm
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
