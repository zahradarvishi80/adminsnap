import React from "react";
import { Form, Button } from "react-bootstrap";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { FormValues, PropType } from "@taban/forms/signup/type";

export const SignUpForm = (props: PropType & FormikProps<FormValues>) => {
    const { t } = useTranslation("sign_up");
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
            <div className="d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column col-12 col-lg-6 p-1 p-lg-2">
                    <Form.Group
                        controlId="sign-up-phone-number"
                        className="position-relative"
                    >
                        <Form.Label>{t("phoneNumber")}</Form.Label>
                        <Form.Control
                            aria-label="phone number"
                            className="h3"
                            type="string"
                            name="phoneNumber"
                            placeholder={t("phoneNumberText")}
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
                        controlId="sign-up-first-name"
                        className="position-relative"
                    >
                        <Form.Label>{t("FirstName")}</Form.Label>
                        <Form.Control
                            aria-label="first name"
                            className="h3"
                            type="string"
                            name="firstName"
                            placeholder={t("FirstName")}
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
                        controlId="sign-up-last-name"
                        className="position-relative"
                    >
                        <Form.Label>{t("LastName")}</Form.Label>
                        <Form.Control
                            aria-label="last name"
                            className="h3"
                            type="string"
                            name="lastName"
                            placeholder={t("LastName")}
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
                        controlId="sign-up-national-number"
                        className="position-relative"
                    >
                        <Form.Label>{t("NationalNumber")}</Form.Label>
                        <Form.Control
                            aria-label="national number"
                            className="h3"
                            type="string"
                            name="nationalNumber"
                            placeholder={t("nationalText")}
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
                        controlId="sign-up-national-number"
                        className="position-relative"
                    >
                        <Form.Label>{t("city")}</Form.Label>
                        <Form.Control
                            aria-label="city"
                            className=" h3"
                            type="string"
                            name="city"
                            placeholder={t("city")}
                            onBlur={handleBlur}
                            value={values.city}
                            onChange={handleChange}
                            isInvalid={touched.city && !!errors.city}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.city}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        controlId="sign-up-national-number"
                        className="position-relative"
                    >
                        <Form.Label>{t("Address")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            aria-label="address"
                            className=" h3"
                            type="string"
                            name="address"
                            placeholder={t("Address")}
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
