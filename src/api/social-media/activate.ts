import { Api } from "@taban/api/api";
import { UserType, SocialMediaType } from "@taban/dto";
import { castApiDataToCreateSocialMedia } from "@taban/api/social-media/create";

export function Activate(user: UserType, socialMediaId: number) {
    return new Promise<{
        socialMedia: SocialMediaType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/social-media/${socialMediaId}/activate`,
            method: "patch",
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
