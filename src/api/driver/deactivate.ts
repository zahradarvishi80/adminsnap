import { Api } from "@taban/api/api";
import { UserType, DriverType } from "@taban/dto";
import { castApiDataToCreateAdmin } from "@taban/api/admin/create";

export function Deactivate(user: UserType, driverId: number) {
    return new Promise<{
        driver: DriverType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/driver/${driverId}/deactivate`,
            method: "patch",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    driver: castApiDataToCreateAdmin(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}
