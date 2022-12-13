import React from "react";
import { Form, Button } from "react-bootstrap";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { FormValuesChangePassword, PropType } from "@taban/forms/driver/type";

export const CreateFormChangePassword: React.FC<
    PropType & FormikProps<FormValuesChangePassword>
> = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    isValid,
    errors,
    submitTxt,
}) => {
    const { t } = useTranslation("driver");

    const formPrefix = "driver-change-password-";
    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column col-12 p-1 p-lg-2">
                    <Form.Group
                        controlId={`${formPrefix}username`}
                        className="position-relative"
                    >
                        <Form.Label>
                            {t("inputFirstChangePasswordLabel")}
                        </Form.Label>
                        <Form.Control
                            aria-label="username"
                            className="h3"
                            type="string"
                            name="username"
                            value={values.username}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group
                        controlId={`${formPrefix}password`}
                        className="position-relative"
                    >
                        <Form.Label>
                            {t("inputFourChangePasswordLabel")}
                        </Form.Label>
                        <Form.Control
                            aria-label="password"
                            className="h3"
                            type="password"
                            name="password"
                            value={values.password}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group
                        controlId={`${formPrefix}new-password`}
                        className="position-relative"
                    >
                        <Form.Label>
                            {t("inputSecondChangePasswordLabel")}
                        </Form.Label>
                        <Form.Control
                            aria-label="newPassword"
                            className="h3"
                            type="password"
                            name="newPassword"
                            placeholder={t(
                                "inputSecondChangePasswordPlaceholder",
                            )}
                            onBlur={handleBlur}
                            value={values.newPassword}
                            onChange={handleChange}
                            isInvalid={
                                touched.newPassword && !!errors.newPassword
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.newPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        controlId={`${formPrefix}password-confirmation`}
                        className="position-relative"
                    >
                        <Form.Label>
                            {t("inputThreeChangePasswordLabel")}
                        </Form.Label>
                        <Form.Control
                            aria-label="passwordConfirmation"
                            className="h3"
                            type="password"
                            name="passwordConfirmation"
                            placeholder={t(
                                "inputThreeChangePasswordPlaceholder",
                            )}
                            onBlur={handleBlur}
                            value={values.passwordConfirmation}
                            onChange={handleChange}
                            isInvalid={
                                touched.passwordConfirmation &&
                                !!errors.passwordConfirmation
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.passwordConfirmation}
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
