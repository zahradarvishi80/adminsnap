import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { UserType } from "@taban/dto";

export const UsersList: FC<{ items: UserType[] }> = ({ items }) => {
    const { t } = useTranslation("user");

    const renderStatusButton = (item: UserType) => {
        if (item.status === "active") {
            return (
                <Link
                    className="m-2 btn btn-danger"
                    to={`/user/${item.id}/deactivate`}
                >
                    {t("buttonDeactivateUserTitle")}
                </Link>
            );
        } else {
            return (
                <Link
                    className="m-2 btn btn-success"
                    to={`/user/${item.id}/activate`}
                >
                    {t("buttonActivateUserTitle")}
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
                            <Card.Title>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        {item?.username}
                                    </li>
                                    <li className="list-group-item">
                                        {item?.firstName} {item?.lastName}
                                    </li>
                                </ul>
                            </Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <Link
                                className="m-2 btn btn-primary"
                                to={`/user/${item?.id}`}
                                state={item}
                            >
                                {t("buttonGoDetailsUserTitle")}
                            </Link>
                            <Link
                                className="m-2 btn btn-info"
                                to={`/user/${item?.id}/rate`}
                                state={item}
                            >
                                {t("rate")}
                            </Link>
                            {renderStatusButton(item)}
                        </Card.Footer>
                    </Card>
                ))}
        </>
    );
};
