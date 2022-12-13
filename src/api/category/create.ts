import { Api } from "@taban/api/api";
import { UserType, CategoryType } from "@taban/dto";

export function castApiDataToCategory(data: any): CategoryType {
    return {
        id: data?.id,
        status: data?.status,
        title: data?.title,
        description: data?.description,
        parent_id: data?.parent_id,
        top_parent_id: data?.top_parent_id,
        contents: data?.contents,
    };
}

export function Create(user: UserType, category: CategoryType) {
    return new Promise<{ category: CategoryType }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/category",
            method: "post",
            body: {
                title: category.title,
                description: category.description,
                parent_id: category.parent_id,
                top_parent_id: category.top_parent_id,
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
            .catch((message: string[]) => {
                return reject(message);
            });
    });
}
