import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ListGroup } from "react-bootstrap";

import { Category } from "@taban/api";
import { CategoryType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { useAppParam, useAppLocation } from "@taban/route";
import { Notfound, BreadCrumb, Wrapper } from "@taban/component";

export const Show: React.FC<{}> = () => {
    const { t } = useTranslation("category");

    const [category, setCategory] = useState<CategoryType>({
        id: 0,
        status: "activate",
        title: "",
        description: "",
        parent_id: 0,
        top_parent_id: 0,
        contents: {
            id: 0,
            hash: "",
            link: "",
            path: "",
            type: "",
            status: "",
        },
    });
    const [showNotFound, setNotFound] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    const { id } = useAppParam();
    let targetId = id === undefined ? 2 : Number(id);

    const { state }: any = useAppLocation();

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("category"), href: "/category" },
        { name: t("categoryNumber") + Number(id).toString(), href: "#" },
    ];

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            setNotFound(false);

            Category.Get(user, targetId)
                .then((data: any) => {
                    setCategory(data?.category);
                    dispatch(setLoaderDown());
                })
                .catch(() => setNotFound(true));
        }
    }, []);

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            setNotFound(false);

            Category.Get(user, targetId)
                .then((data: any) => {
                    setCategory(data?.category);
                    dispatch(setLoaderDown());
                })
                .catch(() => setNotFound(true));
        }
    }, [user, targetId]);

    return (
        <>
            {showNotFound ? (
                <Notfound />
            ) : (
                <>
                    <BreadCrumb breadcrumb={crumbs} />

                    <Wrapper>
                        {state ? (
                            <section className="row">
                                <div className="col-5">
                                    {state.id !== 1 && (
                                        <img
                                            src={state.contents.link}
                                            alt={state.contents.type}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="col-7">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h4>
                                                {t(
                                                    "typographyFirstTitleDetails",
                                                )}
                                                : {state.title}
                                            </h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>
                                                {t(
                                                    "typographySecondTitleDetails",
                                                )}
                                                : {state.id}
                                            </h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <p>
                                                {t("paragraphDetails")}:{" "}
                                                {state.description}
                                            </p>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>
                                                {t(
                                                    "typographyThirdTitleDetails",
                                                )}
                                                : {state.parent_id}
                                            </h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>
                                                {t(
                                                    "typographyFourthTitleDetails",
                                                )}
                                                : {state.top_parent_id}
                                            </h4>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </section>
                        ) : (
                            category.title && (
                                <>
                                    <section className="row">
                                        <div className="col-5">
                                            {category.id !== 1 && (
                                                <img
                                                    src={category.contents.link}
                                                    alt={category.contents.type}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className="col-7">
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <h4>
                                                        {t(
                                                            "typographyFirstTitleDetails",
                                                        )}
                                                        : {category.title}
                                                    </h4>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <h4>
                                                        {t(
                                                            "typographySecondTitleDetails",
                                                        )}
                                                        : {category.id}
                                                    </h4>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <p>
                                                        {t("paragraphDetails")}:{" "}
                                                        {category.description}
                                                    </p>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <h4>
                                                        {t(
                                                            "typographyThirdTitleDetails",
                                                        )}
                                                        : {category.parent_id}
                                                    </h4>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <h4>
                                                        {t(
                                                            "typographyFourthTitleDetails",
                                                        )}
                                                        :{" "}
                                                        {category.top_parent_id}
                                                    </h4>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </section>
                                </>
                            )
                        )}
                    </Wrapper>
                </>
            )}
        </>
    );
};
