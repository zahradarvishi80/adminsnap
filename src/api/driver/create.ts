import { Api } from "@taban/api/api";
import { UserType, AdminType, DriverType } from "@taban/dto";

export function castApiDataToCreateDriver(data: any): AdminType {
    return {
        id: data?.id,
        username: data?.username,
        phoneNumber: data?.phone_number,
        lastName: data?.last_name,
        firstName: data?.first_name,
        address: data?.address,
        nationalNumber: data?.national_number,
        status: data?.status,
        roles: data?.roles,
    };
}

export function Create(user: UserType, driver: AdminType) {
    return new Promise<{
        driver: DriverType;
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/driver",
            method: "post",
            body: {
                username: driver.username,
                phone_number: driver.phoneNumber,
                last_name: driver.lastName,
                first_name: driver.firstName,
                address: driver.address,
                national_number: driver.nationalNumber,
            },
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
