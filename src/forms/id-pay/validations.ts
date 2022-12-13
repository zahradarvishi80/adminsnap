import * as Yup from "yup";

export const ValidationSchema = (t: any) =>
    Yup.object().shape({
        token: Yup.string().required(t("validationEmptyInput")),
    });
