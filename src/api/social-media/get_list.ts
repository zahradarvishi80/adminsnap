import { Api } from "@taban/api/api";
import { UserType, PaginationType, SocialMediaType } from "@taban/dto";
import { castApiDateToPagination } from "@taban/api/helper";

export function GetList(user: UserType, pagination: PaginationType) {
    return new Promise<{
        pagination: PaginationType;
        socialMedia: SocialMediaType[];
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/social-media",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
            params: {
                per_page: pagination.perPage,
                current_page: pagination.currentPage,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    pagination: castApiDateToPagination(data),
                    socialMedia: castApiDataToSocialMediaArray(data?.data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}

export function castApiDataToSocialMediaArray(data: any): SocialMediaType[] {
    return data;
}
