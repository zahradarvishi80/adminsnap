import { Api } from "@taban/api/api";
import { UserType, AdminChangePasswordAndSignInType } from "@taban/dto";

function castApiDataToAdminChangePassword(
    data: any,
): AdminChangePasswordAndSignInType {
    return {
        username: data?.username,
        password: data?.password,
    };
}

export function ChangePassword(
    user: UserType,
    admin: AdminChangePasswordAndSignInType,
) {
    return new Promise<{
        admin: AdminChangePasswordAndSignInType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/auth/change-password",
            method: "post",
            body: {
                username: admin.username,
                password: admin.password,
            },
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                console.log(data);
                return resolve({
                    admin: castApiDataToAdminChangePassword(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
