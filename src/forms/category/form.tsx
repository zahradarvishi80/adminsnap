import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { FormValues, PropType } from "@taban/forms/category/type";
import { ContentType } from "@taban/dto";
import { Contents } from "@taban/component";

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
    const [contents, setContents] = useState<ContentType[]>(values.contents);

    const { t } = useTranslation("category");

    useEffect(() => {
        values.contents = contents;
    }, [contents]);

    const formPrefix = "create-category-";
    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column col-12 p-1 p-lg-2">
                    <Form.Group
                        controlId={`${formPrefix}title`}
                        className="position-relative"
                    >
                        <Form.Label>{t("inputFirstCategoryLabel")}</Form.Label>
                        <Form.Control
                            aria-label="title"
                            className="h3"
                            type="string"
                            name="title"
                            placeholder={t("inputFirstCategoryPlaceholder")}
                            onBlur={handleBlur}
                            value={values.title}
                            onChange={handleChange}
                            isInvalid={touched.title && !!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        controlId={`${formPrefix}description`}
                        className="position-relative"
                    >
                        <Form.Label>{t("inputSecondCategoryLabel")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            aria-label="description"
                            className="h3"
                            type="string"
                            name="description"
                            placeholder={t("inputSecondCategoryPlaceholder")}
                            onBlur={handleBlur}
                            value={values.description}
                            onChange={handleChange}
                            isInvalid={
                                touched.description && !!errors.description
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Contents
                        formPrefix={formPrefix}
                        setContents={setContents}
                        yupError={errors.contents}
                        defaultValue={values.contents}
                        inputValue={"image/png, image/jpeg, image/jpg"}
                    />
                </div>
            </div>
            <Button type="submit" className="col-12 mt-4">
                {submitTxt}
            </Button>
        </Form>
    );
};
