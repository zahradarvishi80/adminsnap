import React, { useState, useEffect } from "react";
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
import { useAppLocation, useAppNavigate, useAppParam } from "@taban/route";
import { CategoryType } from "@taban/dto";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { Wrapper, BreadCrumb } from "@taban/component";
import { isNull } from "util";

export const Edit = () => {
    const { t } = useTranslation("category");

    const [category, setCategory] = useState<CategoryType>({
        id: 0,
        status: "activate",
        title: "",
        description: "",
        parent_id: 0,
        top_parent_id: 0,
        contents: {
            id: 0,
            hash: "",
            link: "",
            path: "",
            type: "",
            status: "",
        },
    });

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    const { state }: any = useAppLocation();

    const navigate = useAppNavigate();
    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("category"), href: "/category" },
        { name: t("buttonEditCategoryTitle"), href: "/#" },
    ];

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            Category.Get(user, targetId).then((data: any) => {
                console.log(data);
                setCategory(data?.category);
                dispatch(setLoaderDown());
            });
        }
    }, []);

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            Category.Get(user, targetId).then((data: any) => {
                setCategory(data?.category);
                dispatch(setLoaderDown());
            });
        }
    }, [targetId, user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                {state ? (
                    <section className="d-flex justify-content-center align-items-center taban-h-100">
                        <section className="col-11 col-lg-7">
                            <Formik<CategoryForm.EditFormValues>
                                validationSchema={CategoryForm.ValidationSchema(
                                    t,
                                )}
                                initialValues={{
                                    id: state.id,
                                    title: state.title,
                                    description: state.description,
                                    contents: state.contents,
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    Category.Edit(user, state.id, {
                                        title: event.title,
                                        description: event.description,
                                        contents: event.contents,
                                    }).then((data) => {
                                        dispatch(Global.setLoaderDown());
                                        navigate(
                                            `/category/${data?.category?.id}`,
                                        );
                                    });
                                }}
                                component={(props: any) => (
                                    <CategoryForm.EditForm
                                        submitTxt={t("SubmitTextEditForm")}
                                        {...props}
                                    />
                                )}
                            />
                        </section>
                    </section>
                ) : (
                    category.id && (
                        <section className="d-flex justify-content-center align-items-center taban-h-100">
                            <section className="col-11 col-lg-7">
                                <Formik<CategoryForm.EditFormValues>
                                    validationSchema={CategoryForm.ValidationSchema(
                                        t,
                                    )}
                                    initialValues={{
                                        id: category.id,
                                        title: category.title,
                                        description: category.description,
                                        contents:
                                            category.contents !== null
                                                ? category.contents
                                                : {
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
                                        Category.Edit(user, category.id, {
                                            title: event.title,
                                            description: event.description,
                                            contents: event.contents,
                                        }).then((data) => {
                                            dispatch(Global.setLoaderDown());
                                            navigate(
                                                `/category/${data?.category?.id}`,
                                            );
                                        });
                                    }}
                                    component={(props: any) => (
                                        <CategoryForm.EditForm
                                            submitTxt={t("SubmitTextEditForm")}
                                            {...props}
                                        />
                                    )}
                                />
                            </section>
                        </section>
                    )
                )}
            </Wrapper>
        </>
    );
};
