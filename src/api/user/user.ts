import { Api } from "../api";
import { TokenType, UserType } from "@taban/dto";

export function loginUserApi(phoneNumber: string) {
    return new Promise<{
        data: {
            messages: string[];
        };
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/auth/user/signin",
            method: "post",
            body: {
                username: phoneNumber,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    data: {
                        messages: data,
                    },
                });
            })
            .catch((messages: string[]) => {
                console.log("message", messages);
                return reject(messages);
            });
    });
}

export function verifyUserApi(phoneNumber: string, code: number) {
    return new Promise<{ data: TokenType }>((resolve) => {
        const api = new Api({
            path: "/api/v1/auth/user/verify",
            method: "post",
            body: {
                username: phoneNumber,
                otp: code,
            },
        });
        return api.call().then((data: any) => {
            return resolve({
                data: {
                    apiToken: data?.api,
                    fcmToken: data?.fcm,
                },
            });
        });
    });
}

export function signUpUserApi(props: UserType) {
    const { phoneNumber, firstName, lastName } = props;
    return new Promise<{ data: string }>((resolve) => {
        const api = new Api({
            path: "/api/v1/auth/user/signup",
            method: "post",
            body: {
                username: phoneNumber,
                last_name: lastName,
                first_name: firstName,
            },
        });
        return api.call().then((data: any) => {
            return resolve({
                data: "success",
            });
        });
    });
}
