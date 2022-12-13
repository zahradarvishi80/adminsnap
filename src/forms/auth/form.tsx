import React from "react";
import { Form, Button } from "react-bootstrap";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { FormValues, PropType } from "./type";

export const EditForm = (props: PropType & FormikProps<FormValues>) => {
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

    const { t } = useTranslation("navbar");

    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column col-12 col-lg-6 p-1 p-lg-2">
                    <Form.Group
                        controlId="auth-username"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputFirstLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="username"
                            className="h3"
                            type="string"
                            name="username"
                            placeholder={t("inputFirstPlaceholder")}
                            value={values.username}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="auth-phone-number"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputSecondLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="phone number"
                            className="h3"
                            type="string"
                            name="phone_number"
                            placeholder={t("inputSecondPlaceholder")}
                            value={values.phone_number}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="auth-first-name"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputThreeLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="first name"
                            className="h3"
                            type="string"
                            name="first_name"
                            placeholder={t("inputThreePlaceholder")}
                            onBlur={handleBlur}
                            value={values.first_name}
                            onChange={handleChange}
                            isInvalid={
                                touched.first_name && !!errors.first_name
                            }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.first_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        controlId="auth-last-name"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputFourLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="last name"
                            className="h3"
                            type="string"
                            name="last_name"
                            placeholder={t("inputFourPlaceholder")}
                            onBlur={handleBlur}
                            value={values.last_name}
                            onChange={handleChange}
                            isInvalid={touched.last_name && !!errors.last_name}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.last_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <div className="d-flex flex-column col-12 col-lg-6 p-1 p-lg-2">
                    <Form.Group
                        controlId="auth-national-number"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputFiveLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="national number"
                            className="h3"
                            type="string"
                            name="national_number"
                            placeholder={t("inputFivePlaceholder")}
                            value={values.national_number}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="auth-address"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputSixLabelTitle")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            aria-label="address"
                            className=" h3"
                            type="string"
                            name="address"
                            placeholder={t("inputSixPlaceholder")}
                            onBlur={handleBlur}
                            value={values.address}
                            onChange={handleChange}
                            isInvalid={touched.address && !!errors.address}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.address}
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
