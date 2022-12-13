import React from "react";
import { useTranslation } from "react-i18next";

import "@taban/screens/404/style.scss";
import { ReactComponent as ErrorPageSvg } from "@taban/assets/404.svg";
export default () => {
    const { t } = useTranslation("404");

    return (
        <section className="d-flex justify-content-center  flex-column  col-10 col-lg-12   position-absolute top-50 start-50 translate-middle  ">
            <div className="d-flex justify-content-center mx-auto align-items-center col-12 col-lg-7">
                <ErrorPageSvg />
            </div>
            <div className=" text-center mx-auto">
                <div className=" flex-column  p-2 title text-center fs-1 ">
                    {t("title")}
                </div>

                <div className="mt-2 flex-column   lh-base ">
                    <span className="p-2 span-text"> {t("text1")} </span>
                    <br />

                    <span className="p-2 span-text"> {t("text2")}</span>
                    <br />
                    <span className="p-2 span-text">{t("text3")}</span>
                </div>

                <div className="p-2 text-center">
                    <a
                        href="/"
                        className="btn btn-outline-info mt-4 px-3 py-2 btn-lg rounded-pill button-shadow"
                        role="button"
                    >
                        {t("button")}
                    </a>
                </div>
            </div>
        </section>
    );
};
