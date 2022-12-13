import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function Get(user: UserType) {
    return new Promise<{
        idPay: string;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/bank/idPay",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    idPay: data.rules,
                });
            })
            .catch((message: string[]) => {
                return reject(message);
            });
    });
}
