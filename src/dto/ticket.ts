export type Tickets = {
    total: number;
    current_page: number;
    per_page: number;
    data: TicketType[];
};

export type TicketType = {
    id: number;
    description: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        phone_number: string;
    };
};
