import { Api } from "@taban/api/api";
import { UserType, SMSType } from "@taban/dto";
import { castApiDataToSMS } from "@taban/api/sms/get";

export function Edit(user: UserType, sms: SMSType) {
    return new Promise<{
        sms: SMSType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/setting/sms",
            method: "post",
            body: {
                token: sms.token,
                sender: sms.sender,
            },
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
