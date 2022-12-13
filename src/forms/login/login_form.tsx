import React from "react";
import { Form, Button } from "react-bootstrap";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { FormValues, PropType } from "./type";

export const LoginForm = (props: PropType & FormikProps<FormValues>) => {
    const { t } = useTranslation("login");
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
                <Form.Label>{t("username")}</Form.Label>
                <Form.Control
                    className="text-center h3"
                    type="text"
                    name="username"
                    placeholder={t("username")}
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
                controlId="validationFormik02"
                className="position-relative text-center"
            >
                <Form.Label>{t("password")}</Form.Label>
                <Form.Control
                    className="text-center h3"
                    type="password"
                    name="password"
                    placeholder={t("password")}
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="col-12 mt-4">
                {submitTxt}
            </Button>
        </Form>
    );
};
