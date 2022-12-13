import { Api } from "@taban/api/api";
import { UserType, AdminType } from "@taban/dto";
import { castApiDataToCreateAdmin } from "@taban/api/admin/create";

export function Get(user: UserType, adminId: number) {
    return new Promise<{
        admin: AdminType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/admin/${adminId}`,
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    admin: castApiDataToCreateAdmin(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
