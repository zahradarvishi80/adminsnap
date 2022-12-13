import { Api } from "@taban/api/api";
import { UserType, AdminType } from "@taban/dto";

export function castApiDataToCreateAdmin(data: any): AdminType {
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

export function Create(user: UserType, admin: AdminType) {
    return new Promise<{
        admin: AdminType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/admin",
            method: "post",
            body: {
                username: admin.username,
                phone_number: admin.phoneNumber,
                last_name: admin.lastName,
                first_name: admin.firstName,
                address: admin.address,
                national_number: admin.nationalNumber,
            },
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
