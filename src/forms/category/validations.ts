import * as Yup from "yup";

export const ValidationSchema = (t: any) =>
    Yup.object().shape({
        title: Yup.string()
            .required(t("validationEmptyInputFirstCategory"))
            .min(3, t("validationMinTextInputFirstCategory"))
            .max(128, t("validationMaxTextInputFirstCategory")),
        description: Yup.string()
            .required(t("validationEmptyInputSecondCategory"))
            .min(10, t("validationMinTextInputSecondCategory")),
    });
