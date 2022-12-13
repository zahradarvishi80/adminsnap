import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { DriverType } from "@taban/dto";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const DriverList: FC<{ items: DriverType[] }> = ({ items }) => {
    const { t } = useTranslation("driver");

    const renderStatusButton = (item: DriverType) => {
        if (item.status === "active") {
            return (
                <Link
                    className="m-2 btn btn-danger"
                    to={`/driver/${item.id}/deactivate`}
                >
                    {t("buttonDeactivateDriverTitle")}
                </Link>
            );
        } else {
            return (
                <Link
                    className="m-2 btn btn-success"
                    to={`/driver/${item.id}/activate`}
                >
                    {t("buttonActivateDriverTitle")}
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
                                className="m-2 btn btn-primary"
                                to={`/driver/${item?.id}`}
                                state={item}
                            >
                                {t("buttonGoDetailsDriverTitle")}
                            </Link>
                            <Link
                                className="m-2 btn btn-warning"
                                to={`/driver/${item?.id}/edit`}
                                state={item}
                            >
                                {t("buttonEditDriverTitle")}
                            </Link>
                            {renderStatusButton(item)}
                        </Card.Footer>
                    </Card>
                ))}
        </>
    );
};
