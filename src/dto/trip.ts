import { DriverType } from "./driver";
import { UserType } from "./user";

export type TripType = {
    id: number;
    start: string;
    end: string;
    price: number;
    user: UserType;
    driver: DriverType;
    status: string;
    paymentStatus: string;
};
