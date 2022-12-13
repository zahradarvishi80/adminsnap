import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { TicketType } from "@taban/dto";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const TicketsList: FC<{ items: TicketType[] }> = ({ items }) => {
    const { t } = useTranslation("ticket");

    return (
        <>
            {items &&
                items.map((item) => (
                    <Card key={item.id} className="my-3">
                        <Card.Body>
                            <Card.Title>
                                <div className="d-flex p-3 flex-column align-items-center justify-content-center border border-1 border-dark rounded-5">
                                    <h4 className="align-self-md-start">
                                        {t("user")}: {item.user.first_name}
                                    </h4>
                                    <p
                                        className="text-muted"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        {t("comment")}: {item?.description}
                                    </p>
                                </div>
                            </Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <Link
                                className="m-2 btn btn-primary"
                                to={`/ticket/${item?.id}`}
                                state={item}
                            >
                                {t("buttonGoDetailsAdminTitle")}
                            </Link>
                        </Card.Footer>
                    </Card>
                ))}
        </>
    );
};
