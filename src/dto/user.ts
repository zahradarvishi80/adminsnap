export type UserType = {
    id: number;
    username: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
    token?: TokenType;
    status: "active" | "inactive";
};

export type TokenType = {
    apiToken?: string;
    fcmToken?: string;
};
