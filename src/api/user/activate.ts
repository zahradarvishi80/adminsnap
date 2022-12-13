import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function castApiDataToUser(data: any): UserType {
    return {
        id: data?.id,
        username: data?.username,
        phoneNumber: data?.phone_number,
        lastName: data?.last_name,
        firstName: data?.first_name,
        status: data?.status,
    };
}

export function Activate(user: UserType, userId: number) {
    return new Promise<{
        user: UserType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/user/${userId}/activate`,
            method: "patch",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    user: castApiDataToUser(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
