import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function Reset(user: UserType) {
    return new Promise<{}>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/user/rate",
            method: "post",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    rate: data,
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
