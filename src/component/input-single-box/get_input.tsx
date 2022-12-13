import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// export const GetPrize: React.FC<{}> = (props:any) => {
export default (props: any) => {
    const [showA, setShowA] = useState(props.showNotModal);

    const [showTitle, setTitle] = useState(props.showtitleName);
    const [showBody, setBody] = useState(props.showBody);

    const handleClose = () => props.setNotModal(false);
    const sendFunc = () => props.setFunc;
    const toggleShowA = () => {
        setShowA(props.setNotModal);
    };

    // const handleClose = () => toggleShowA;

    return (
        <>
            <Modal show={showA} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <strong className="me-auto mx-5 ">{showTitle}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>{showBody}</Form.Label>
                            <Form.Control type="text" autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
