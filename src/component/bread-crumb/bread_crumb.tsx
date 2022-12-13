import React, { FC } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import { breadCrumbType } from "@taban/dto";

export const BreadCrumb: React.FC<{ breadcrumb: breadCrumbType[] }> = ({
    breadcrumb,
}) => {
    return (
        <Breadcrumb
            className="d-flex my-1 col-9 col-lg-9 mx-auto justify-content-between "
            aria-label="breadcrumb"
        >
            {breadcrumb.map((details: breadCrumbType) => {
                return (
                    <Breadcrumb.Item
                        href={details.href}
                        className="breadcrumb-item mx-1"
                    >
                        {details.name}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};
