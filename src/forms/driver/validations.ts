import * as Yup from "yup";

function isValidIranianNationalCode(number: string) {
    if (!/^\d{10}$/.test(number)) return false;
    const check = +number[9];
    const sum =
        number
            .split("")
            .slice(0, 9)
            .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
}

export const ValidationSchema = (t: any) =>
    Yup.object().shape({
        username: Yup.string()
            .required(t("inputTextRequired"))
            .matches(/^[a-zA-Z0-9]+$/, t("inputUserNameError")),
        phoneNumber: Yup.string()
            .required(t("inputTextRequired"))
            .matches(/^(0|\+98)9[0-9]{9}$/, t("inputPhoneNumberError")),
        firstName: Yup.string()
            .required(t("inputTextRequired"))
            .min(1)
            .max(128),
        lastName: Yup.string().required(t("inputTextRequired")).min(1).max(128),
        address: Yup.string()
            .required(t("inputTextRequired"))
            .min(10, t("inputAddressMinTextError")),
        nationalNumber: Yup.string()
            .required(t("inputTextRequired"))
            .matches(/^[0-9]*$/g, t("inputNationalNumberError"))
            .max(10),
    });

export const ValidationSchemaChangePassword = (t: any) =>
    Yup.object().shape({
        newPassword: Yup.string()
            .required(t("inputTextRequired"))
            .min(8, t("inputPasswordMinError"))
            .matches(
                /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                t("errorInputPasswordLogic"),
            ),
        passwordConfirmation: Yup.string()
            .required(t("inputTextRequired"))
            .oneOf(
                [Yup.ref("newPassword"), null],
                t("errorInputPasswordConfirm"),
            ),
    });
