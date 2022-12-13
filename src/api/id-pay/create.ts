import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function Create(user: UserType, idPay: string) {
    return new Promise<{
        idPay: string;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/bank/idPay",
            method: "post",
            header: {
                "api-token": user?.token?.apiToken,
            },
            body: {
                token: idPay,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    idPay: data,
                });
            })
            .catch((message: string[]) => {
                return reject(message);
            });
    });
}
