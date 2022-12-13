import React, { useEffect, useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { FormValues, PropType } from "@taban/forms/contact-us/type";

export const CreateAndEditForm: React.FC<
    PropType & FormikProps<FormValues>
> = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    submitTxt,
    callbackPhoneNumbers,
}) => {
    const [phoneNumber, setPhoneNumber] = useState<string>(values.phone_number);
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>(
        values.phone_numbers,
    );

    const { t } = useTranslation("contact_us");

    useEffect(() => {
        if (phoneNumber !== "") {
            setPhoneNumbers([...phoneNumbers, phoneNumber]);
            callbackPhoneNumbers(phoneNumbers);
        }
        values.phone_number = "";
    }, [phoneNumber]);

    useEffect(() => {
        values.phone_numbers = phoneNumbers;
        callbackPhoneNumbers(phoneNumbers);
    }, [phoneNumbers]);

    const formPrefix = "create-and-edit-contact-us-";

    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column col-12 p-1 p-lg-2">
                    <div className="d-flex flex-row justify-content-between">
                        <Form.Group
                            controlId={`${formPrefix}phone-number`}
                            className="position-relative w-75"
                        >
                            <Form.Label>{t("inputFirstLabel")}</Form.Label>
                            <Form.Control
                                aria-label="phone_number"
                                className="h3"
                                type={"string"}
                                name="phone_number"
                                placeholder={t("inputFirstPlaceholder")}
                                onBlur={handleBlur}
                                value={values.phone_number}
                                onChange={handleChange}
                                isInvalid={
                                    touched.phone_number &&
                                    !!errors.phone_number &&
                                    phoneNumbers.length === 0
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone_number}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            variant="success"
                            onClick={() => {
                                !errors.phone_number &&
                                    setPhoneNumber(values.phone_number);
                            }}
                            className="align-self-center"
                        >
                            {t("buttonAddPhoneNumber")}
                        </Button>
                    </div>
                    <div className="d-flex flex-wrap">
                        {phoneNumbers.length >= 1 &&
                            phoneNumbers.map((item: string) => (
                                <div
                                    key={item}
                                    className="col-4 my-3 mx-2 border border-3 rounded-pill border-warning d-flex flex-row justify-content-between p-3"
                                >
                                    <div className="text-black">{item}</div>
                                    <Badge
                                        style={{ cursor: "pointer" }}
                                        pill
                                        bg="danger"
                                        onClick={() =>
                                            setPhoneNumbers(
                                                phoneNumbers.filter(
                                                    (phone) => phone !== item,
                                                ),
                                            )
                                        }
                                    >
                                        ×
                                    </Badge>
                                </div>
                            ))}
                    </div>
                    <Form.Group
                        controlId={`${formPrefix}address`}
                        className="position-relative"
                    >
                        <Form.Label>{t("inputSecondLabel")}</Form.Label>
                        <Form.Control
                            aria-label="address"
                            className="h3"
                            type="string"
                            name="address"
                            placeholder={t("inputSecondPlaceholder")}
                            onBlur={handleBlur}
                            value={values.address}
                            onChange={handleChange}
                            isInvalid={touched.address && !!errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.address}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
            </div>
            <Button
                type="submit"
                className="col-12 mt-4 mb-4"
                disabled={phoneNumbers.length === 0 && true}
            >
                {submitTxt}
            </Button>
        </Form>
    );
};
