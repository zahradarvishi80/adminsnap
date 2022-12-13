import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Ticket } from "@taban/api";
import { TicketType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { Notfound, Wrapper, BreadCrumb } from "@taban/component";

export const Show = () => {
    const [ticket, setTicket] = useState<TicketType>({
        id: 0,
        description: "",
        user: {
            id: 0,
            first_name: "",
            last_name: "",
            phone_number: "",
        },
    });
    const [showNotFound, setNotFound] = useState<boolean>(false);

    const { t } = useTranslation("ticket");

    const user = useAppSelector(User.selectUser);

    const dispatch = useAppDispatch();

    const { id } = useParams();

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("ticket"), href: "/ticket" },
        { name: t("ticketId") + Number(id).toString(), href: "#" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        setNotFound(false);

        if (id) {
            Ticket.Get(user, Number(id))
                .then((data) => {
                    setTicket(data.ticket);
                    dispatch(setLoaderDown());
                })
                .catch((data) => {
                    dispatch(setLoaderDown());
                    const code = data.response.status;
                    if (code === 404) {
                        setNotFound(true);
                    }
                });
        }
    }, []);

    return (
        <>
            {showNotFound ? (
                <Notfound />
            ) : (
                <>
                    <BreadCrumb breadcrumb={crumbs} />

                    <Wrapper>
                        <div className="container  p-5 d-flex flex-column">
                            <div className="d-flex flex-row flex-wrap">
                                <div className="d-flex flex-column  col-12 col-md-11">
                                    <h3 className="mx-2">
                                        {t("firstName")} :{" "}
                                        {ticket.user.first_name}
                                    </h3>
                                    <h3 className="mx-2">
                                        {t("lastName")} :{" "}
                                        {ticket.user.last_name}
                                    </h3>
                                </div>
                            </div>
                            <span>
                                {t("phoneNumber")} :{" "}
                                <a href={`tel:${ticket.user.phone_number}`}>
                                    {ticket.user.phone_number}
                                </a>
                            </span>
                            <span>
                                {t("id")} : {ticket.user.id}
                            </span>
                        </div>
                        <div
                            className="border border-1 rounded-5 p-5"
                            style={{ wordBreak: "break-word" }}
                        >
                            {t("comment")}: {ticket.description}
                        </div>
                    </Wrapper>
                </>
            )}
        </>
    );
};
