import { Api } from "@taban/api/api";
import { UserType, PaginationType, ContentType } from "@taban/dto";
import { castApiDateToPagination } from "@taban/api/helper";

export function GetList(user: UserType, pagination: PaginationType) {
    return new Promise<{
        pagination: PaginationType;
        content: ContentType[];
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/content",
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
                    content: castApiDataToContentArray(data?.data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}

export function castApiDataToContentArray(data: any): ContentType[] {
    return data;
}
