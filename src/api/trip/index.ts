import { TripType } from "@taban/dto/trip";
import { Api } from "../api";
import { PaginationType, UserType } from "@taban/dto";
import { castApiDateToPagination } from "../helper";

export const getTripList = (user: UserType, pagination: PaginationType) => {
    return new Promise<{ tripList: TripType[]; pagination: PaginationType }>(
        (resolve, reject) => {
            const api = new Api({
                method: "get",
                path: "/api/v1/admin/category",
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
                        pagination: {
                            total: 2,
                            perPage: 10,
                            currentPage: 1,
                        },
                        tripList: castApiDataToTripList([
                            {
                                id: 1,
                                start: "3543543543544",
                                end: "3543543543544",
                                price: 444440,
                                user: {
                                    id: 0,
                                    username: "string",
                                    lastName: "string",
                                    firstName: "string",
                                    phoneNumber: "09122222222",
                                    status: "active",
                                },
                                driver: {
                                    id: 1,
                                    username: "adasda",
                                    phoneNumber: "09111111111111",
                                    lastName: "asd",
                                    firstName: "asd",
                                    address: "asd",
                                    nationalNumber: "asasd",
                                    status: "active",
                                },
                                status: "ok",
                                paymentStatus: "pay",
                            },
                            {
                                id: 2,
                                start: "3543543543544",
                                end: "3543543543544",
                                price: 5555550,
                                user: {
                                    id: 0,
                                    username: "string",
                                    lastName: "string",
                                    firstName: "string",
                                    phoneNumber: "09122222222",
                                    status: "active",
                                },
                                driver: {
                                    id: 1,
                                    username: "adasda",
                                    phoneNumber: "09111111111111",
                                    lastName: "asd",
                                    firstName: "asd",
                                    address: "asd",
                                    nationalNumber: "asasd",
                                    status: "active",
                                },
                                status: "ok",
                                paymentStatus: "pay",
                            },
                        ]),
                    });
                })
                .catch((messages: string[]) => {
                    return reject(messages);
                });
        },
    );
};

export const castApiDataToTripList = (data: any): TripType[] => {
    return data.map((item: any) => {
        return {
            id: item.id,
            start: item.start,
            end: item.end,
            price: item.price,
            user: item.user,
            driver: item.driver,
            status: item.status,
            paymentStatus: item.paymentStatus,
        };
    });
};
