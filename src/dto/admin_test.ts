

import { TokenType } from "./user";

export type AdminAuthType = {
    id: number;
    username: string;
    phoneNumber: string;
    lastName: string;
    firstName: string;
    status: "active" | "inactive";
    roles: string;
    token?: TokenType;
};
