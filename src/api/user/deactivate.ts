import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";
import { castApiDataToUser } from "@taban/api/user/activate";

export function Deactivate(user: UserType, userId: number) {
    return new Promise<{
        user: UserType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/user/${userId}/deactivate`,
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
