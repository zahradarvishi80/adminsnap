import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { SocialMediaType } from "@taban/dto";

export const SocialMedialList: FC<{ items: SocialMediaType[] }> = ({
    items,
}) => {
    const { t } = useTranslation("social_media");

    const renderStatusButton = (item: SocialMediaType) => {
        if (item.status === "social_media_activate") {
            return (
                <Link
                    className="m-2 btn btn-danger"
                    to={`/setting/social-media/${item.id}/deactivate`}
                >
                    {t("buttonDeactivateSocialMediaTitle")}
                </Link>
            );
        } else {
            return (
                <Link
                    className="m-2 btn btn-success"
                    to={`/setting/social-media/${item.id}/activate`}
                >
                    {t("buttonActivateSocialMediaTitle")}
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
                            {renderStatusButton(item)}
                            <Link
                                className="m-2 btn btn-primary"
                                to="/setting/social-media/new"
                            >
                                {t("buttonNewSocialMediaTitle")}
                            </Link>
                        </Card.Footer>
                    </Card>
                ))}
        </>
    );
};
