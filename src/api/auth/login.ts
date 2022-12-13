import { Api } from "@taban/api/api";
import { TokenType } from "@taban/dto";

export function Login(username: string, password: string) {
    return new Promise<{ data: TokenType }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/auth/sign-in-password",
            method: "post",
            body: {
                username: username,
                password: password,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    data: {
                        apiToken: data?.api,
                        fcmToken: data?.fcm,
                    },
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
