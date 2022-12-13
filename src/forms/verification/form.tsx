import React from "react";
import { Form, Button } from "react-bootstrap";
import { FormikProps } from "formik";

import { FormValues, PropType } from "./type";

export const VerificationForm = (props: PropType & FormikProps<FormValues>) => {
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        submitTxt,
    } = props;
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group
                controlId="validationFormik01"
                className="position-relative text-center"
            >
                <Form.Label>Enter Otp Code Send for you</Form.Label>
                <Form.Control
                    className="text-center h3"
                    type="number"
                    name="otp"
                    placeholder="xxxx"
                    onBlur={handleBlur}
                    value={values.otp}
                    onChange={handleChange}
                    isInvalid={touched.otp && !!errors.otp}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                    {errors.otp}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="col-12 mt-4">
                {submitTxt}
            </Button>
        </Form>
    );
};
