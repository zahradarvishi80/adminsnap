export type FormValues = {
    username: string;
    phoneNumber: string;
    lastName: string;
    firstName: string;
    address: string;
    nationalNumber: string;
};

export type PropType = {
    submitTxt: string;
};

export type FormValuesChangePassword = {
    username: string;
    password: string;
    newPassword: string;
    passwordConfirmation: string;
};
