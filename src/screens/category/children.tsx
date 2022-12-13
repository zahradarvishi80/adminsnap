import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppParams } from "@taban/route";
import { CategoryList } from "@taban/dto";
import { CategoriesList, BreadCrumb, Wrapper } from "@taban/component";
import { useAppSelector, User, useAppDispatch } from "@taban/redux-config";
import { GetList } from "@taban/api/category";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";

export const Children = () => {
    const [children, setChildren] = useState([]);

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const { t } = useTranslation("category");

    const { id } = useAppParams();
    let targetId = id === undefined ? 2 : Number(id);

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("category"), href: "/category" },
        { name: t("children"), href: "#" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        GetList(user, targetId).then((data: any) => {
            setChildren(data?.categories?.children);
            dispatch(setLoaderDown());
        });
    }, []);

    useEffect(() => {
        dispatch(setLoaderUp());
        GetList(user, targetId).then((data: any) => {
            setChildren(data?.categories?.children);
            dispatch(setLoaderDown());
        });
    }, [user, targetId]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                {children.length > 0 &&
                    children.map((childrenItem: CategoryList) => (
                        <CategoriesList
                            items={childrenItem}
                            key={childrenItem.category.id}
                        />
                    ))}
            </Wrapper>
        </>
    );
};
