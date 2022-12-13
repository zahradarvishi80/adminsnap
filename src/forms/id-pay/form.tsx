import React from "react";
import { Form, Button } from "react-bootstrap";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { FormValues, PropType } from "@taban/forms/sms/type";

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
    const { t } = useTranslation("sms");

    const formPrefix = "id-pay-";
    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column col-12 p-1 p-lg-2">
                    <Form.Group
                        controlId={`${formPrefix}token`}
                        className="position-relative"
                    >
                        <Form.Label>{t("inputFirstSMSLabel")}</Form.Label>
                        <Form.Control
                            aria-label="token"
                            className="h3"
                            type="string"
                            name="token"
                            placeholder={t("inputFirstSMSPlaceholder")}
                            onBlur={handleBlur}
                            value={values.token}
                            onChange={handleChange}
                            isInvalid={touched.token && !!errors.token}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.token}
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
