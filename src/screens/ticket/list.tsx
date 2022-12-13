import React, { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";

import { Ticket } from "@taban/api";
import { PaginationType, TicketType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    AppPagination,
    TicketsList,
    BreadCrumb,
    Wrapper,
} from "@taban/component";
import { useAppPagination } from "@taban/route";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";

export const List: FC<{}> = () => {
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>(
        useAppPagination(),
    );

    const user = useAppSelector(User.selectUser);

    const dispatch = useAppDispatch();

    const { t } = useTranslation("ticket");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("ticket"), href: "#" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        Ticket.GetList(user, pagination).then((data: any) => {
            setTickets(data.tickets);
            setPagination(data.pagination);
            dispatch(setLoaderDown());
        });
    }, [user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                <TicketsList items={tickets} />
                {tickets.length > 0 && (
                    <AppPagination pagination={pagination} />
                )}
            </Wrapper>
        </>
    );
};
