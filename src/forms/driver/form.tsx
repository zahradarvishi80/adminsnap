import React from "react";
import { Form, Button } from "react-bootstrap";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { FormValues, PropType } from "@taban/forms/driver/type";

export const SignUpForm = (props: PropType & FormikProps<FormValues>) => {
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

    const { t } = useTranslation("driver");

    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column col-12 col-lg-6 p-1 p-lg-2">
                    <Form.Group
                        controlId="driver-username"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputFirstLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="username"
                            className="h3"
                            type="string"
                            name="username"
                            placeholder={t("inputFirstPlaceholder")}
                            onBlur={handleBlur}
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={touched.username && !!errors.username}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        controlId="driver-phone-number"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputSecondLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="phone number"
                            className="h3"
                            type="string"
                            name="phoneNumber"
                            placeholder={t("inputSecondPlaceholder")}
                            onBlur={handleBlur}
                            value={values.phoneNumber}
                            onChange={handleChange}
                            isInvalid={
                                touched.phoneNumber && !!errors.phoneNumber
                            }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.phoneNumber}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        controlId="driver-first-name"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputThreeLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="first name"
                            className="h3"
                            type="string"
                            name="firstName"
                            placeholder={t("inputThreePlaceholder")}
                            onBlur={handleBlur}
                            value={values.firstName}
                            onChange={handleChange}
                            isInvalid={touched.firstName && !!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        controlId="driver-last-name"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputFourLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="last name"
                            className="h3"
                            type="string"
                            name="lastName"
                            placeholder={t("inputFourPlaceholder")}
                            onBlur={handleBlur}
                            value={values.lastName}
                            onChange={handleChange}
                            isInvalid={touched.lastName && !!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <div className="d-flex flex-column col-12 col-lg-6 p-1 p-lg-2">
                    <Form.Group
                        controlId="driver-national-number"
                        className="position-relative"
                    >
                        <Form.Label>{t("inputFiveLabelTitle")}</Form.Label>
                        <Form.Control
                            aria-label="national number"
                            className="h3"
                            type="string"
                            name="nationalNumber"
                            placeholder={t("inputFivePlaceholder")}
                            onBlur={handleBlur}
                            value={values.nationalNumber}
                            onChange={handleChange}
                            isInvalid={
                                touched.nationalNumber &&
                                !!errors.nationalNumber
                            }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.nationalNumber}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        controlId="driver-address"
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
