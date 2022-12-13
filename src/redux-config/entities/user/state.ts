import { UserStateType } from "./type";

export const initialState: UserStateType = {
    value: {
        id: 0,
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        token: undefined,
        status: "active",
        address: "",
        nationalNumber: "",
        roles: "",
    },
    status: "unAuth",
    loginProcessStatus: "failed",
    message: [],
};
