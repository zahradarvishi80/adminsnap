import { Api } from "@taban/api/api";
import { UserType, PaginationType } from "@taban/dto";
import { castApiDateToPagination } from "@taban/api/helper";
import { TicketType } from "@taban/dto/ticket";

export function GetList(user: UserType, pagination: PaginationType) {
    return new Promise<{
        pagination: PaginationType;
        tickets: TicketType[];
    }>((resolve, reject) => {
        const api = new Api({
            path: "/api/v1/admin/ticket",
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
                    tickets: castApiDateToTicketsArray(data?.data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}

function castApiDateToTicketsArray(data: any): TicketType[] {
    if (data !== undefined && Array.isArray(data)) {
        return data.map((item) => {
            return {
                id: item?.id,
                description: item?.description,
                user: item?.user,
            };
        });
    } else {
        return [];
    }
}
