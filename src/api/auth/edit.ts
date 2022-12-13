import { Api } from "@taban/api/api";
import { UserType, AuthType } from "@taban/dto";

export function castApiDataToEditAuth(data: any): AuthType {
    return {
        last_name: data?.last_name,
        first_name: data?.first_name,
        address: data?.address,
    };
}

export function Edit(user: UserType, auth: AuthType) {
    return new Promise<{
        admin: AuthType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/auth",
            method: "put",
            body: {
                first_name: auth.first_name,
                last_name: auth.last_name,
                address: auth.address,
            },
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    admin: castApiDataToEditAuth(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
