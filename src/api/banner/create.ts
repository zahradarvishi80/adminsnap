import { Api } from "@taban/api/api";
import { UserType, BannerType } from "@taban/dto";

export function castApiDataToCreateBanner(data: any): BannerType {
    return {
        id: data?.id,
        status: data?.status,
        title: data?.title,
        content: data?.content,
    };
}

export function Create(user: UserType, banner: BannerType) {
    return new Promise<{
        banner: BannerType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/banner",
            method: "post",
            body: {
                title: banner.title,
                hash: banner.content.hash,
            },
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
