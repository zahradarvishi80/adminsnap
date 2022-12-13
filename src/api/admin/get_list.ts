import { Api } from "@taban/api/api";
import { UserType, PaginationType, AdminType } from "@taban/dto";
import { castApiDateToPagination } from "@taban/api/helper";

export function GetList(user: UserType, pagination: PaginationType) {
    return new Promise<{
        pagination: PaginationType;
        admin: AdminType[];
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/admin",
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
                    admin: castApiDataToAdminArray(data?.data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}

export function castApiDataToAdminArray(data: any): AdminType[] {
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
