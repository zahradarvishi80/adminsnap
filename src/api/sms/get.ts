import { Api } from "@taban/api/api";
import { UserType, SMSType } from "@taban/dto";

export const castApiDataToSMS = (data: any) => {
    return {
        token: data?.token,
        sender: data?.sender,
    };
};

export function Get(user: UserType) {
    return new Promise<{
        sms: SMSType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/setting/sms",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    sms: castApiDataToSMS(data),
                });
            })
            .catch((message: string[]) => {
                return reject(message);
            });
    });
}
