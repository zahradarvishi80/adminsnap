import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { GetList } from "@taban/api/category";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import { CategoriesList, Wrapper, BreadCrumb } from "@taban/component";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { useAppLocation } from "@taban/route";

export const List = () => {
    const [categories, setCategories] = useState<any>({});

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const { t } = useTranslation("category");

    const { search } = useAppLocation();
    const params = new URLSearchParams(search);
    const id = Number(params.get("id"));

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("category"), href: "#" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        GetList(user).then((data: any) => {
            setCategories(data.categories);
            dispatch(setLoaderDown());
        });
    }, []);

    useEffect(() => {
        dispatch(setLoaderUp());
        if (id > 0) {
            GetList(user, id).then((data: any) => {
                setCategories(data.categories);
                dispatch(setLoaderDown());
            });
        }
    }, [user, id]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />
            <Wrapper>
                {categories?.category && (
                    <>
                        <CategoriesList items={categories} />
                    </>
                )}
            </Wrapper>
        </>
    );
};
