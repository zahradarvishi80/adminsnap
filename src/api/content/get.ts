import { Api } from "@taban/api/api";
import { UserType, ContentType } from "@taban/dto";

export function castApiDataToGetContent(data: any): ContentType {
    return {
        id: data?.id,
        hash: data?.hash,
        link: data?.link,
        path: data?.path,
        status: data?.status,
        type: data?.type,
    };
}

export function Get(user: UserType, contentId: number) {
    return new Promise<{
        content: ContentType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/content/${contentId}`,
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    content: castApiDataToGetContent(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
