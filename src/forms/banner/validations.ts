import * as Yup from "yup";

export const ValidationSchema = (t: any) =>
    Yup.object().shape({
        title: Yup.string()
            .required(t("inputTextRequired"))
            .min(3, t("minMassageTitle"))
            .max(256, t("maxMassageTitle")),
        contents: Yup.object().required(t("inputTextRequired")),
    });
