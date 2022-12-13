import { Api } from "@taban/api/api";
import { UserType, PaginationType } from "@taban/dto";
import { castApiDateToPagination } from "@taban/api/helper";

export function GetList(
    user: UserType,
    pagination: PaginationType,
    userName: string | null,
) {
    return new Promise<{
        pagination: PaginationType;
        user: UserType[];
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/user",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
            params: {
                per_page: pagination.perPage,
                current_page: pagination.currentPage,
                username: userName,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    pagination: castApiDateToPagination(data),
                    user: castApiDataToUserArray(data?.data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}

function castApiDataToUserArray(data: any): UserType[] {
    if (data !== undefined && Array.isArray(data)) {
        return data.map((item) => {
            return {
                id: item?.id,
                username: item?.username,
                status: item?.status,
                firstName: item?.first_name,
                lastName: item?.last_name,
                phoneNumber: item?.phoneNumber,
                address: item?.address,
                nationalNumber: item?.national_number,
                rate: item?.rate,
            };
        });
    } else {
        return [];
    }
}
