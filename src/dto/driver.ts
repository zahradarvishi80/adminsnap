export type DriverType = {
    id: number;
    username: string;
    phoneNumber: string;
    lastName: string;
    firstName: string;
    address: string;
    nationalNumber: string;
    status: "active" | "inactive";
};

export type DriverChangePasswordAndSignInType = {
    username: string;
    password: string;
};

export type DriverSignInType = {
    username: string;
};

export type DriverVerifyType = {
    username: string;
    apiToken: string;
};
