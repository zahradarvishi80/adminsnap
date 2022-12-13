import * as Yup from "yup";

export const ValidationSchema = (phoneNumbers: string[], t: any) => {
    if (phoneNumbers.length === 0) {
        return Yup.object().shape({
            phone_number: Yup.string().required(t("errorForEmptyInput")),
            // .matches(/^(0|\+98)9[0-9]{9}$/, t("inputPhoneNumberError")),
        });
    } else {
        return Yup.object().shape({
            phone_number: Yup.string().matches(
                /^(0|\+98)9[0-9]{9}$/,
                t("inputPhoneNumberError"),
            ),
            address: Yup.string()
                .required(t("errorForEmptyInput"))
                .min(3, t("inputAddressMinTextError")),
        });
    }
};
