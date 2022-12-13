import * as Yup from "yup";

export const ValidationSchema = (t: any) =>
    Yup.object().shape({
        first_name: Yup.string()
            .required(t("inputTextRequired"))
            .min(1)
            .max(128),
        last_name: Yup.string()
            .required(t("inputTextRequired"))
            .min(1)
            .max(128),
        address: Yup.string()
            .required(t("inputTextRequired"))
            .min(10, t("inputAddressMinTextError")),
    });
