import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
    textBox: Yup.string().required().min(5),
});
