import { Api } from "@taban/api/api";
import { UserType, CategoryType, CategoryEditType } from "@taban/dto";
import { castApiDataToCategory } from "@taban/api/category/create";

export function Edit(
    user: UserType,
    categoryId: number,
    category: CategoryEditType,
) {
    return new Promise<{
        category: CategoryType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/category/${categoryId}`,
            method: "put",
            body: {
                title: category.title,
                description: category.description,
                hash: category.contents.hash,
            },
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
