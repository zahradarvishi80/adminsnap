import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CategoryList, CategoryType } from "@taban/dto";

export const CategoriesList: FC<{ items: CategoryList }> = ({ items }) => {
    const { t } = useTranslation("category");

    const renderStatusButton = (item: CategoryType) => {
        if (item.status === "activate") {
            return (
                <Link
                    className="m-2 btn btn-danger"
                    to={`/category/${item.id}/deactivate`}
                >
                    {t("buttonDeactivateCategoryTitle")}
                </Link>
            );
        } else {
            return (
                <Link
                    className="m-2 btn btn-success"
                    to={`/category/${item.id}/activate`}
                >
                    {t("buttonActivateCategoryTitle")}
                </Link>
            );
        }
    };

    return (
        <>
            {items.category && (
                <Card key={items.category.id} className="mb-3 shadow">
                    <Card.Body className="d-flex flex-column flex-sm-row align-items-center">
                        <img
                            src={items?.category?.contents?.link}
                            className="col-4  col-md-2"
                        ></img>
                        <div className="px-3">
                            <Card.Title>{items?.category?.title}</Card.Title>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <Link
                            className={`m-2 btn btn-info ${
                                items?.children.length === 0 ? "disabled" : ""
                            }`}
                            to={`/category/${items?.category?.id}/children`}
                        >
                            {t("buttonShowChildrenCategoryTitle")}
                        </Link>
                        <Link
                            className="m-2 btn btn-primary"
                            to={`/category/${items?.category?.id}`}
                            state={items?.category}
                        >
                            {t("buttonGoDetailsCategoryTitle")}
                        </Link>
                        {items.category.id > 1 && (
                            <Link
                                className="m-2 btn btn-warning"
                                to={`/category/${items?.category?.id}/edit`}
                                state={items?.category}
                            >
                                {t("buttonEditCategoryTitle")}
                            </Link>
                        )}
                        {renderStatusButton(items.category)}
                        <Link
                            className="m-2 btn btn-primary"
                            to="/category/new"
                            state={items?.category}
                        >
                            {t("buttonNewCategoryTitle")}
                        </Link>
                    </Card.Footer>
                </Card>
            )}
        </>
    );
};
