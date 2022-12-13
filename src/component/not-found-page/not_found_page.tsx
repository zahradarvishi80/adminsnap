import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as ErrorPageSvg } from "@taban/assets/notfound.svg";

export const Notfound = (props: any) => {
    const { t } = useTranslation("404");
    return (
        <section className="d-flex justify-content-center align-items-center flex-column  col-12 col-lg-9  position-absolute top-50 start-50 translate-middle-x  ">
            <div className="flex-row  col-12 col-lg-7">
                <ErrorPageSvg />
            </div>

            <div className=" flex-row col-12 col-lg-12 text-center">
                <span className="p-2 fs-1  span-text">
                    {t("firstTextNotFound")}
                </span>
                <br />
                <span className="p-2 span-text">
                    {" "}
                    {t("secondTextNotFound")}
                </span>
                <br />
                <span className="p-2 span-text"> {t("thirdTextNotFound")}</span>
                <br />
                <br />

                <a
                    href="/"
                    className="btn btn-outline-info  px-3 py-2 btn-lg rounded-pill button-shadow"
                    role="button"
                >
                    {t("fourthTextNotFound")}
                </a>
            </div>
        </section>
    );
};
