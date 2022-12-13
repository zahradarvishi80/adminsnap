import { Api } from "@taban/api/api";
import { UserType, CategoryList } from "@taban/dto";

export function GetList(user: UserType, id?: number) {
    return new Promise<{
        categories: CategoryList;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/category",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
            params: { id },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    categories: castApiDataToCategoryArray(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}

export function castApiDataToCategoryArray(data: any): CategoryList {
    return {
        category: data?.category,
        children: data?.children,
    };
}
