import { Api } from "@taban/api/api";
import { UserType, ContactUsType } from "@taban/dto";

export function castApiDataToCreateContactUs(data: any): ContactUsType {
    return {
        address: data?.address,
        phone_number: data?.phone_number,
        social_media: data?.social_media,
    };
}

export function Create(user: UserType, contactUs: ContactUsType) {
    return new Promise<{
        contactUs: ContactUsType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/contact-us",
            method: "post",
            body: {
                phone_number: contactUs.phone_number,
                address: contactUs.address,
            },
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    contactUs: castApiDataToCreateContactUs(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
