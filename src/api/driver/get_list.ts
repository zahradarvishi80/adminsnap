import { Api } from "@taban/api/api";
import { UserType, PaginationType, DriverType } from "@taban/dto";
import { castApiDateToPagination } from "@taban/api/helper";

export function GetList(user: UserType, pagination: PaginationType) {
    return new Promise<{
        pagination: PaginationType;
        driver: DriverType[];
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/driver",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
            params: {
                per_page: pagination.perPage,
                current_page: pagination.currentPage,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    pagination: castApiDateToPagination(data),
                    driver: castApiDataToDriverArray(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}

export function castApiDataToDriverArray(data: any): DriverType[] {
    return data.map((item: any) => {
        return {
            id: item?.id,
            username: item?.username,
            phoneNumber: item?.phone_number,
            lastName: item?.last_name,
            firstName: item?.first_name,
            address: item?.address,
            nationalNumber: item?.national_number,
            status: item?.status,
            roles: item?.roles,
        };
    });
}
