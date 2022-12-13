import React, { useEffect } from "react";
import {
    Navbar,
    Container,
    ThemeProvider,
    Nav,
    NavDropdown,
    Offcanvas,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import logo from "@taban/assets/logo.svg";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import { selectLoader } from "@taban/redux-config/entities/global";
import { Loader } from "@taban/screens";
import { AdminType } from "@taban/dto";

export const TabanNav = () => {
    const expand = "lg";
    const { t } = useTranslation("navbar");
    return (
        <Navbar
            key={expand}
            bg="light"
            expand={expand}
            className="mb-3 p-0"
            sticky="top"
        >
            <Container fluid className="flex-nowrap  col-12 col-lg-9 ">
                <Navbar.Brand className="mx-0 ">
                    <Link
                        className="navbar-brand col-md-1 d-flex flex-row mx-0 "
                        to={"/"}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            className="mx-auto"
                            width={40}
                            height={40}
                        />
                    </Link>
                </Navbar.Brand>

                <div className="d-flex w-100 justify-content-between flex-row-reverse flex-lg-row  mx-0">
                    <Navbar.Toggle
                        aria-controls={`offcanvasNavbar-expand-${expand}`}
                    />

                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Body>
                            <Nav
                                className={`d-flex flex-column flex-${expand}-row `}
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title
                                        id={`offcanvasNavbarLabel-expand-${expand}`}
                                    >
                                        Offcanvas
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <NavDropdown
                                        title={t("User")}
                                        id="user-dropdown"
                                    >
                                        <NavDropdown.Item href="/user">
                                            {t("Users")}
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown
                                        title={t("driver")}
                                        id="driver-dropdown"
                                    >
                                        <NavDropdown.Item href="/driver/new">
                                            {t("New")}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/driver">
                                            {t("drivers")}
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown
                                        title={t("admin")}
                                        id="admin-dropdown"
                                    >
                                        <NavDropdown.Item href="/admin/new">
                                            {t("New")}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/admin">
                                            {t("Admins")}
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown
                                        title={t("trip")}
                                        id="trip-dropdown"
                                    >
                                        <NavDropdown.Item href="/trips">
                                            {t("trips")}
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown
                                        title={t("Category")}
                                        id="category-dropdown"
                                    >
                                        <NavDropdown.Item href="/category">
                                            {t("Categories")}
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown
                                        title={t("Setting")}
                                        id="setting-dropdown"
                                    >
                                        <NavDropdown
                                            title={t("Social Media")}
                                            id="setting-social-media-dropdown"
                                            drop="end"
                                        >
                                            <NavDropdown.Item href="/setting/social-media/new">
                                                {t("New")}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="/setting/social-media">
                                                {t("SocialMedias")}
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown.Item href="/setting/rules">
                                            {t("Rules")}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/setting/about-us">
                                            {t("AboutUs")}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/setting/contact-us">
                                            {t("ContactUs")}
                                        </NavDropdown.Item>

                                        <NavDropdown.Item href="/setting/sms">
                                            {t("SMS")}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/setting/id-pay">
                                            {t("IdPay")}
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title={t("Ticket")}
                                        id="product-dropdown"
                                    >
                                        <NavDropdown.Item href="/ticket">
                                            {t("showTicket")}
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Offcanvas.Body>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                    <div className="d-flex align-items-center">
                        <AuthUser />
                    </div>
                </div>
            </Container>
        </Navbar>
    );
};

export const TabanNavbar = (props: any) => {
    const loaderFlag = useAppSelector(selectLoader);

    return (
        <ThemeProvider>
            <TabanNav />

            <Container fluid className="bg-white position-relative">
                <div className="">{loaderFlag && <Loader.Loader />}</div>
                <div className="">
                    <Outlet />
                    {props.children}
                </div>
            </Container>
        </ThemeProvider>
    );
};

const AuthUser = (props: any) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(User.selectUser);

    const getUser = () => {
        dispatch(User.AuthAdminAction(user));
    };

    useEffect(() => {
        //if user have not username then
        if (!user.username) {
            getUser();
        }
    }, []);

    return (
        <>
            {user.token !== undefined && user.token.apiToken !== undefined ? (
                <>
                    <AuthItem user={{ ...user, roles: "" }} />
                </>
            ) : (
                <UnAuthItem />
            )}
        </>
    );
};

const AuthItem = (props: { user: AdminType }) => {
    const { user } = props;

    const { t } = useTranslation("navbar");

    const title = user.firstName && `${t("titleDropdown")} ${user.firstName}`;

    return (
        <>
            {user.firstName && (
                <NavDropdown title={title} id="basic-nav-dropdown">
                    <Link
                        className="dropdown-item"
                        to={"/auth/edit"}
                        state={user}
                    >
                        {t("firstItemNavDropdown")}
                    </Link>
                    <NavDropdown.Divider />
                    <Link to="/logout" className="dropdown-item">
                        {t("secondItemNavDropdown")}
                    </Link>
                </NavDropdown>
            )}
        </>
    );
};

const UnAuthItem = (props: any) => {
    const { t } = useTranslation("navbar");

    return (
        <>
            <Link
                className="text-muted border border-1 p-1 rounded-3 mx-1 mx-md-5 nav-link d-md-flex"
                to={"/login"}
            >
                {t("loginLabel")}
            </Link>
        </>
    );
};
