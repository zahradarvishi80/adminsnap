import { Api } from "@taban/api/api";
import { UserType, BannerType } from "@taban/dto";
import { castApiDataToCreateBanner } from "@taban/api/banner/create";

export function Activate(user: UserType, bannerId: number) {
    return new Promise<{
        banner: BannerType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/banner/${bannerId}/activate`,
            method: "patch",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    banner: castApiDataToCreateBanner(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
