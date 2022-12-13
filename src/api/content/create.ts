import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function Create(user: UserType, imageFile: File) {
    return new Promise<{}>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/content",
            method: "post",
            body: {
                file: imageFile,
            },
            header: {
                "api-token": user?.token?.apiToken,
                "content-type": "multipart/form-data",
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve(data);
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
