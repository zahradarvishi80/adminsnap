import { Api } from "@taban/api/api";
import { UserType, ContactUsGetType } from "@taban/dto";

export function Get(user: UserType) {
    return new Promise<{
        contactUs: ContactUsGetType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/contact-us",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
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
