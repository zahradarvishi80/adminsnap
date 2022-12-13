import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function Search(user: UserType, userName: string) {
    return new Promise<{
        user: UserType[];
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/user`,
            method: "get",
            params: {
                username: userName,
            },
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    user: data?.data,
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
