import React, { useState } from "react";
import { Col, Row, Toast } from "react-bootstrap";

import { ReactComponent as Warning } from "@taban/assets/warning.svg";

export default (props: any) => {
    const [showA, setShowA] = useState(props.showNotToast);
    const toggleShowA = () => {
        setShowA(props.setNotToast);
    };

    return (
        <Row>
            <Col className=" text-center position-absolute bottom-0 end-0 ">
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header className="bg-warning text-dark">
                        <strong className="me-auto  ">
                            {props.t("toastTile")}
                        </strong>
                        <small className="mr-auto text-muted mx-2">
                            <Warning />
                        </small>
                    </Toast.Header>
                    <Toast.Body className="bg-secondary text-dark">
                        {" "}
                        {props.t("toastText")}
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
};
