import { Api } from "@taban/api/api";
import { UserType, CategoryType } from "@taban/dto";
import { castApiDataToCategory } from "@taban/api/category/create";

export function Deactivate(user: UserType, categoryId: number) {
    return new Promise<{
        category: CategoryType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/category/${categoryId}/deactivate`,
            method: "patch",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    category: castApiDataToCategory(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
