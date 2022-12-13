import { FormikProps } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { FormValues, PropType } from "@taban/forms/single-form-input/type";

export const CreateForm: React.FC<PropType & FormikProps<FormValues>> = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    isValid,
    errors,
    submitTxt,
}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column col-12 p-1 p-lg-2">
                    <Form.Group className="position-relative">
                        <Form.Control
                            as="textarea"
                            aria-label={"rules"}
                            className="h3"
                            type="string"
                            name="textBox"
                            placeholder="..."
                            onBlur={handleBlur}
                            value={values.textBox}
                            onChange={handleChange}
                            isInvalid={touched.textBox && !!errors.textBox}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.textBox}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
            </div>
            <Button type="submit" className="col-12 mt-4">
                {submitTxt}
            </Button>
        </Form>
    );
};
