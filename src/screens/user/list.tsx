import React, { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";

import { UserApi } from "@taban/api";
import { PaginationType, UserType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    AppPagination,
    UsersList,
    BreadCrumb,
    Wrapper,
} from "@taban/component";
import { useAppPagination } from "@taban/route";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { Form, Button } from "react-bootstrap";

export const List: FC<{}> = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>(
        useAppPagination(),
    );
    const [searchUserName, setSearchUserName] = useState<string>("");
    const user = useAppSelector(User.selectUser);

    const dispatch = useAppDispatch();

    const { t } = useTranslation("user");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("user"), href: "/user" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        UserApi.GetList(user, pagination, null).then((data: any) => {
            setUsers(data.user);
            setPagination(data.pagination);
            dispatch(setLoaderDown());
        });
    }, [user]);

    const callApiForSearch = (title: string) => {
        if (title.length > 0) {
            UserApi.GetList(user, pagination, title).then((data: any) => {
                setUsers(data.user);
                setPagination(data.pagination);
                dispatch(setLoaderDown());
            });
        }
    };
    const handleChange = (title: string) => {
        setSearchUserName(title);
        setUsers([]);
        callApiForSearch(title);
    };

    const handleReset = () => {
        UserApi.Reset(user).then((data) => {
            console.log(data);
        });
    };
    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                <>
                    <Form className={"container"}>
                        <div className="d-flex flex-row col-12 col-lg-12 ">
                            <div className="d-flex flex-row col-3 col-lg-3">
                                <span
                                    className="text-danger btn "
                                    onClick={handleReset}
                                >
                                    {t("reseTheRates")}
                                </span>
                            </div>
                            <div className="d-flex flex-row col-9 col-lg-9 ">
                                <Form.Group
                                    controlId="search"
                                    className="position-relative  w-100 rest "
                                >
                                    <Form.Control
                                        aria-label="search"
                                        className="h3 text-center "
                                        type="string"
                                        name="search"
                                        placeholder={t("searchTheUserName")}
                                        autoComplete="off"
                                        onChange={(e) => {
                                            handleChange(e.target.value);
                                        }}
                                        value={searchUserName}
                                    ></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </Form>
                    <UsersList items={users} />
                    {users.length > 0 && (
                        <AppPagination pagination={pagination} />
                    )}
                </>
            </Wrapper>
        </>
    );
};
