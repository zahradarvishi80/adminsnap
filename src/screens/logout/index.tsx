import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const Logout = () => {
    const [show, setShow] = useState<boolean>(true);

    const { t } = useTranslation("logout");

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <>
            {show && (
                <div className="d-flex justify-content-center m-5 p-5">
                    <Alert variant="danger" className="w-100">
                        <Alert.Heading>{t("alertTitle")}</Alert.Heading>
                        <p>{t("alertDescription")}</p>
                        <hr />
                        <Button
                            href="/login"
                            onClick={() => {
                                setShow(false);
                            }}
                            variant="outline-danger"
                        >
                            {t("alertButtonTitle")}
                        </Button>
                    </Alert>
                </div>
            )}
        </>
    );
};
