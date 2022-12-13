import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Screen from "@taban/screens";
import * as Layout from "@taban/layouts";
import { Auth } from "@taban/route/auth";
export * from "@taban/route/hooks";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Auth>
                            <Layout.Navbar.TabanNavbar></Layout.Navbar.TabanNavbar>
                        </Auth>
                    }
                >
                    <Route path="" element={<Screen.Home.Home />} />
                    <Route path="user">
                        <Route path="" element={<Screen.User.List />} />
                        <Route path=":id" element={<Screen.User.Show />} />
                        <Route
                            path=":id/activate"
                            element={<Screen.User.Activate />}
                        />
                        <Route
                            path=":id/deactivate"
                            element={<Screen.User.Deactivate />}
                        />
                    </Route>
                    <Route path="trips" element={<Screen.Trip.List />} />
                    <Route path="driver">
                        <Route path="" element={<Screen.Driver.List />} />
                        <Route path="new" element={<Screen.Driver.New />} />
                        <Route path=":id" element={<Screen.Driver.Show />} />
                        <Route
                            path=":id/edit"
                            element={<Screen.Driver.Edit />}
                        />
                        <Route
                            path=":id/activate"
                            element={<Screen.Driver.Activate />}
                        />
                        <Route
                            path=":id/deactivate"
                            element={<Screen.Driver.Deactivate />}
                        />
                        <Route
                            path=":id/edit"
                            element={<Screen.Driver.Edit />}
                        />
                        <Route
                            path=":id/activate"
                            element={<Screen.Driver.Activate />}
                        />
                        <Route
                            path=":id/deactivate"
                            element={<Screen.Driver.Deactivate />}
                        />
                    </Route>
                    <Route path="admin">
                        <Route path="" element={<Screen.Admin.List />} />
                        <Route path="new" element={<Screen.Admin.New />} />
                        <Route path=":id" element={<Screen.Admin.Show />} />
                        <Route
                            path=":id/edit"
                            element={<Screen.Admin.Edit />}
                        />
                        <Route
                            path=":id/activate"
                            element={<Screen.Admin.Activate />}
                        />
                        <Route
                            path=":id/deactivate"
                            element={<Screen.Admin.Deactivate />}
                        />
                        <Route
                            path=":id/change-password"
                            element={<Screen.Admin.ChangePassword />}
                        />
                        <Route
                            path=":id/edit"
                            element={<Screen.Admin.Edit />}
                        />
                        <Route
                            path=":id/activate"
                            element={<Screen.Admin.Activate />}
                        />
                        <Route
                            path=":id/deactivate"
                            element={<Screen.Admin.Deactivate />}
                        />
                    </Route>
                    <Route path="category">
                        <Route path="" element={<Screen.Category.List />} />
                        <Route path="new" element={<Screen.Category.New />} />
                        <Route path=":id" element={<Screen.Category.Show />} />
                        <Route
                            path=":id/edit"
                            element={<Screen.Category.Edit />}
                        />
                        <Route
                            path=":id/activate"
                            element={<Screen.Category.Activate />}
                        />
                        <Route
                            path=":id/deactivate"
                            element={<Screen.Category.Deactivate />}
                        />
                        <Route
                            path=":id/children"
                            element={<Screen.Category.Children />}
                        />
                    </Route>
                    <Route path="/auth/edit" element={<Screen.Auth.Edit />} />
                    <Route path="setting">
                        <Route path="banner">
                            <Route path="" element={<Screen.Banner.List />} />
                            <Route path="new" element={<Screen.Banner.New />} />

                            <Route
                                path=":id/activate"
                                element={<Screen.Banner.Activate />}
                            />
                            <Route
                                path=":id/deactivate"
                                element={<Screen.Banner.Deactivate />}
                            />
                        </Route>
                        <Route path="social-media">
                            <Route
                                path=""
                                element={<Screen.SocialMedia.List />}
                            />
                            <Route
                                path="new"
                                element={<Screen.SocialMedia.New />}
                            />

                            <Route
                                path=":id/activate"
                                element={<Screen.SocialMedia.Activate />}
                            />
                            <Route
                                path=":id/deactivate"
                                element={<Screen.SocialMedia.Deactivate />}
                            />
                        </Route>
                        <Route
                            path="contact-us"
                            element={<Screen.ContactUs />}
                        />
                        <Route path="about-us" element={<Screen.AboutUs />} />
                        <Route path="rules" element={<Screen.Rules />} />
                        <Route path="sms" element={<Screen.SMS />} />
                        <Route path="id-pay" element={<Screen.IdPay />} />
                    </Route>

                    <Route path="ticket">
                        <Route path="" element={<Screen.Ticket.List />} />
                        <Route path=":id" element={<Screen.Ticket.Show />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Screen.Login.Login />} />
                <Route path="/logout" element={<Screen.Logout.Logout />} />
                <Route path="*" element={<Screen.page404.default />} />
            </Routes>
        </Router>
    );
};
