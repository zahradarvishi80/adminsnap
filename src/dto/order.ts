import { UserType } from "@taban/dto/user";

export type OrderType = {
    id?: number;
    items: OrderItemType[];
    user: UserType;
    amount: number;
    total_price: number;
    total_off_price: number;
    status: "order_payment_wait";
};

export type OrderItemType = {
    product: "";
    count: number;
    status: string;
};
