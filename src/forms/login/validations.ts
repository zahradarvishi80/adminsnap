import * as Yup from "yup";

export const LoginValidationSchema = (t: any) =>
    Yup.object().shape({
        username: Yup.string().required(t("theUsernameIsRequired")),
        password: Yup.string().required(t("thePasswordIsRequired")),
    });
