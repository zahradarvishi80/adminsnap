import { Api } from "@taban/api/api";
import { UserType, DriverType } from "@taban/dto";
import { castApiDataToCreateDriver } from "./create";

export function Activate(user: UserType, driverId: number) {
    return new Promise<{
        driver: DriverType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/driver/${driverId}/activate`,
            method: "patch",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    driver: castApiDataToCreateDriver(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
