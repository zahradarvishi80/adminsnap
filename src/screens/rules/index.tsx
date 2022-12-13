//@ts-nocheck
import { RulesApi } from "@taban/api";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import React, { useEffect, useState } from "react";
import { Button, Toast } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./style.scss";
import { BreadCrumb, Wrapper } from "@taban/component";

export const Rules = () => {
    const [rules, setRules] = useState<string>("");
    const user = useAppSelector(User.selectUser);
    const dispatch = useAppDispatch();
    const { t } = useTranslation("admin");
    const crumbs = [
        { name: t(""), href: "" },

        { name: t("home"), href: "/" },
        { name: t("rules"), href: "#" },
    ];

    useEffect(() => {
        getRulesFromServer();
    }, []);

    const getRulesFromServer = () => {
        dispatch(setLoaderUp());
        RulesApi.Get(user).then((data: any) => {
            setRules(data.rules.rules);
            dispatch(setLoaderDown());
        });
    };

    const editRules = () => {
        setShowToast(true);
        setToastMessage(t("sending"));
        setToastBg("");
        RulesApi.Create(user, rules).then((data) => {
            setRules(data.rules);
            setToastMessage(t("success"));
            setToastBg("success");
        });
    };

    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>(t("sending"));
    const [toastBg, setToastBg] = useState<string>("");

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                <div className="d-flex p-3 flex-column container ">
                    <header className="d-flex flex-row">
                        <h2 className="text-center col-11"> {t("rules")}</h2>
                        <Button
                            className="bg-light text-dark col-1 mb-4"
                            onClick={() => editRules()}
                        >
                            {t("save")}
                        </Button>
                    </header>
                    <div className="App">
                        <CKEditor
                            editor={ClassicEditor}
                            data={rules}
                            config={{
                                toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "blockQuote",
                                    "link",
                                    "numberedList",
                                    "bulletedList",
                                    "insertTable",
                                    "|",
                                    "undo",
                                    "redo",
                                ],
                            }}
                            onChange={(event: any, editor: any) => {
                                const data = editor.getData();
                                setRules(data);
                            }}
                        />
                    </div>
                </div>
                <div className="position-absolute top-0">
                    <Toast
                        show={showToast}
                        onClose={() => setShowToast(false)}
                        bg={toastBg}
                    >
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">{t("rules")}</strong>
                            <small className="text-muted">{t("justNow")}</small>
                        </Toast.Header>
                        <Toast.Body className="d-flex flex-row justify-content-between">
                            <span>{toastMessage}</span>

                            {toastBg == "" ? (
                                <div className="rules-send-loader"></div>
                            ) : (
                                <></>
                            )}
                        </Toast.Body>
                    </Toast>
                </div>
            </Wrapper>
        </>
    );
};
