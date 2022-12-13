import { Api } from "@taban/api/api";
import { UserType, SocialMediaType } from "@taban/dto";

export function castApiDataToCreateSocialMedia(data: any): SocialMediaType {
    return {
        id: data?.id,
        status: data?.status,
        title: data?.title,
        content: data?.content,
    };
}

export function Create(user: UserType, socialMedia: SocialMediaType) {
    return new Promise<{
        socialMedia: SocialMediaType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/social-media",
            method: "post",
            body: {
                title: socialMedia.title,
                link: socialMedia.content.link,
                hash: socialMedia.content.hash,
            },
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    socialMedia: castApiDataToCreateSocialMedia(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
