import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { BannerType } from "@taban/dto";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const BannerList: FC<{ items: BannerType[] }> = ({ items }) => {
    const { t } = useTranslation("banner");

    const renderStatusButton = (item: BannerType) => {
        if (item.status === "banner_activate") {
            return (
                <Link
                    className="m-2 btn btn-danger"
                    to={`/setting/banner/${item.id}/deactivate`}
                >
                    {t("buttonDeactivateBannerTitle")}
                </Link>
            );
        } else {
            return (
                <Link
                    className="m-2 btn btn-success"
                    to={`/setting/banner/${item.id}/activate`}
                >
                    {t("buttonActivateBannerTitle")}
                </Link>
            );
        }
    };

    return (
        <>
            {items &&
                items.map((item) => (
                    <Card className="mb-2 shadow">
                        <Card.Body className="d-flex flex-column flex-sm-row align-items-center">
                            <img
                                src={item.content.link}
                                className="col-4  col-md-2"
                            ></img>
                            <div className="px-3">
                                <Card.Title>{item.title}</Card.Title>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <Link
                                className="m-2 btn btn-primary"
                                to={`/setting/banner/${item?.id}`}
                                state={item}
                            >
                                {t("buttonGoDetailsBannerTitle")}
                            </Link>
                            <Link
                                className="m-2 btn btn-warning"
                                to={`/setting/banner/${item?.id}/edit`}
                                state={item}
                            >
                                {t("buttonEditBannerTitle")}
                            </Link>
                            {renderStatusButton(item)}
                            <Link
                                className="m-2 btn btn-primary"
                                to="/setting/banner/new"
                            >
                                {t("buttonNewBannerTitle")}
                            </Link>
                        </Card.Footer>
                    </Card>
                ))}
        </>
    );
};
