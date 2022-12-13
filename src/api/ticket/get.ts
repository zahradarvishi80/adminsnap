import { Api } from "@taban/api/api";
import { UserType } from "@taban/dto";
import { TicketType } from "@taban/dto/ticket";

export function Get(user: UserType, ticketId: number) {
    return new Promise<{
        ticket: TicketType;
    }>((resolve, reject) => {
        const api = new Api({
            path: `/api/v1/admin/ticket/${ticketId}`,
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api
            .call()
            .then((data: any) => {
                return resolve({
                    ticket: castApiDateToTicket(data),
                });
            })
            .catch((messages: string[]) => {
                return reject(messages);
            });
    });
}

function castApiDateToTicket(data: any): TicketType {
    return {
        id: data?.id,
        description: data?.description,
        user: data?.user,
    };
}
