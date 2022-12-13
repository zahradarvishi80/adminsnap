import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { useAppNavigate } from "@taban/route";
import { useAppDispatch } from "@taban/redux-config";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { UserType } from "@taban/dto";

type Props = {
    description: string;
    user: UserType;
    targetId: number;
    api: Function;
    alertType: string;
};

export const AlertComponent = (props: Props) => {
    const { user, api, targetId, alertType, description } = props;

    const { t } = useTranslation("admin");

    const [showAlert, setShowAlert] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const navigate = useAppNavigate();

    useEffect(() => {
        dispatch(setLoaderUp());
        api(user, targetId).then(() => {
            setShowAlert(true);
            dispatch(setLoaderDown());
        });
    }, [user]);

    return (
        <Alert
            show={showAlert}
            variant={alertType == "active" ? "success" : "danger"}
            className="mx-auto w-75"
        >
            <Alert.Heading>{t("alertTitleSuccessMessage")}</Alert.Heading>
            <p>{description}</p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button
                    variant={
                        alertType == "active"
                            ? "outline-success"
                            : "outline-danger"
                    }
                    onClick={() => {
                        setShowAlert(false);
                        navigate(-1);
                    }}
                >
                    {t("alertButton")}
                </Button>
            </div>
        </Alert>
    );
};

export default Alert;
