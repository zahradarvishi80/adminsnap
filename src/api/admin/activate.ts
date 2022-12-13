import { Api } from "@taban/api/api";
import { UserType, AdminType } from "@taban/dto";
import { castApiDataToCreateAdmin } from "@taban/api/admin/create";

export function Activate(user: UserType, adminId: number) {
    return new Promise<{
        admin: AdminType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/admin/${adminId}/activate`,
            method: "patch",
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
