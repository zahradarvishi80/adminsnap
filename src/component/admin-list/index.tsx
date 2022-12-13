import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { AdminType } from "@taban/dto";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AdminsList: FC<{ items: AdminType[] }> = ({ items }) => {
    const { t } = useTranslation("admin");

    const renderStatusButton = (item: AdminType) => {
        if (item.status === "active") {
            return (
                <Link
                    className="m-2 btn btn-danger"
                    to={`/admin/${item.id}/deactivate`}
                >
                    {t("buttonDeactivateAdminTitle")}
                </Link>
            );
        } else {
            return (
                <Link
                    className="m-2 btn btn-success"
                    to={`/admin/${item.id}/activate`}
                >
                    {t("buttonActivateAdminTitle")}
                </Link>
            );
        }
    };

    return (
        <>
            {items &&
                items.map((item) => (
                    <Card key={item.id} className="my-3">
                        <Card.Body>
                            <Card.Title>{item?.username}</Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <Link
                                className="m-2 btn btn-info"
                                to={`/admin/${item?.id}/change-password`}
                                state={item}
                            >
                                {t("buttonChangePasswordAdminTitle")}
                            </Link>
                            <Link
                                className="m-2 btn btn-primary"
                                to={`/admin/${item?.id}`}
                                state={item}
                            >
                                {t("buttonGoDetailsAdminTitle")}
                            </Link>
                            <Link
                                className="m-2 btn btn-warning"
                                to={`/admin/${item?.id}/edit`}
                                state={item}
                            >
                                {t("buttonEditAdminTitle")}
                            </Link>
                            {renderStatusButton(item)}
                            <Link
                                className="m-2 btn btn-primary"
                                to="/admin/new"
                            >
                                {t("buttonNewAdminTitle")}
                            </Link>
                        </Card.Footer>
                    </Card>
                ))}
        </>
    );
};
