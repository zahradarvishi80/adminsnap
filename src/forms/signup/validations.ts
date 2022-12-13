import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .required("the phone number is required")
        .matches(
            /^(0|\+98)9[0-9]{9}$/,
            "the phone number must be like +989xxxxxxx or 09xxxxxxx",
        ),
    firstName: Yup.string().required("the phone number is required"),
    lastName: Yup.string().required("the phone number is required"),
    city: Yup.string().required("the phone number is required"),
    address: Yup.string().required("the phone number is required"),
    nationalNumber: Yup.string().required("the phone number is required"),
});
