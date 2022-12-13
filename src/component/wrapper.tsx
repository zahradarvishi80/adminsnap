import React from "react";
import { Container } from "react-bootstrap";

export const Wrapper = (props: any) => {
    return (
        <div
            className={`d-flex flex-column  col-12 col-lg-9 mx-auto shadow  mb-5 p-3 rounded ${props?.className} `}
            tabIndex={0}
        >
            <Container
                fluid
                className="flex-nowrap  col-12 col-lg-9"
            ></Container>
            {props?.children}
        </div>
    );
};
