import { TokenType } from "./user";

export type AdminType = {
    id: number;
    username: string;
    phoneNumber: string;
    lastName: string;
    firstName: string;
    address: string;
    nationalNumber: string;
    status: "active" | "inactive";
    roles: string;
    token?: TokenType;
};

export type AdminChangePasswordAndSignInType = {
    username: string;
    password: string;
};

export type AdminSignInType = {
    username: string;
};

export type AdminVerifyType = {
    username: string;
    apiToken: string;
};
