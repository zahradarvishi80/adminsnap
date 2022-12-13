import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function Get(user: UserType) {
    return new Promise<{
        rules: string;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/rules",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    rules: data,
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
