import * as Yup from "yup";

export const VerificationValidationSchema = Yup.object().shape({
    otp: Yup.number()
        .required("the code send for you is required")
        .min(1000)
        .max(9999),
});
