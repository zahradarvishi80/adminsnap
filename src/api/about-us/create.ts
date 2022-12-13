import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";

export function Create(user: UserType, aboutUs: string) {
    return new Promise<{
        aboutUs: string;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/about-us",
            method: "post",
            body: {
                about_us: aboutUs,
            },
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    aboutUs: castApiDateToAboutUs(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
function castApiDateToAboutUs(data: any): any {
    return {
        aboutUs: data,
    };
}
