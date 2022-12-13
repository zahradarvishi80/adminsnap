import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function Create(user: UserType, rules: string) {
    return new Promise<{
        rules: string;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/rules",
            method: "post",
            body: {
                rules: rules,
            },
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
