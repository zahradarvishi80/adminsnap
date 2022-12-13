import { Api } from "@taban/api/api";
import { UserType, AdminType } from "@taban/dto";

export function castApiDataToAuth(data: any): AdminType {
    return {
        id: data?.id,
        username: data?.username,
        phoneNumber: data?.phone_number,
        lastName: data?.last_name,
        firstName: data?.first_name,
        address: data?.address,
        nationalNumber: data?.national_number,
        status: data?.status,
        roles: data?.roles,
    };
}

export function Get(user: UserType) {
    return new Promise<{
        admin: AdminType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/auth",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    admin: castApiDataToAuth(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
