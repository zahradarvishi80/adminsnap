import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function SetRate(user: UserType, userId: number, rate: number) {
    return new Promise<{
        rate: number;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/user/${userId}/rate`,
            method: "put",
            header: {
                "api-token": user?.token?.apiToken,
            },
            body: {
                rate: rate,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    rate: data.rate,
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
