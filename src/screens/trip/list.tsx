import React, { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";

import { UserApi } from "@taban/api";
import { PaginationType, UserType } from "@taban/dto";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import { AppPagination, BreadCrumb, Wrapper } from "@taban/component";
import { useAppPagination } from "@taban/route";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { Form, Button, Card } from "react-bootstrap";
import { getTripList } from "@taban/api/trip";
import { TripType } from "@taban/dto/trip";
import { Link } from "react-router-dom";

export const List: FC<{}> = () => {
    const [trips, setTrips] = useState<TripType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>(
        useAppPagination(),
    );
    const user = useAppSelector(User.selectUser);

    const dispatch = useAppDispatch();

    const { t } = useTranslation("trip");

    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("trip"), href: "/trip" },
    ];

    useEffect(() => {
        dispatch(setLoaderUp());
        getTripList(user, pagination).then((data: any) => {
            setTrips(data.tripList);
            setPagination(data.pagination);
            dispatch(setLoaderDown());
        });
    }, [user]);

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />

            <Wrapper>
                <>
                    {trips.map((item: TripType) => (
                        <TripItem trip={item} />
                    ))}
                    {trips.length > 0 && (
                        <AppPagination pagination={pagination} />
                    )}
                </>
            </Wrapper>
        </>
    );
};

export const TripItem: React.FC<{ trip: TripType }> = ({ trip }) => {
    console.log(trip);
    console.log("sdasdasdasdsa");

    return (
        <>
            <Card key={trip.id} className="my-3">
                <Card.Body>
                    <Card.Title>
                        <ul className="list-group">
                            <li className="list-group-item">id: {trip.id}</li>
                            <li className="list-group-item">
                                نام کاربری راننده {trip.driver.username}
                            </li>

                            <li className="list-group-item">
                                نام کاربری مسافر: {trip.user.username}
                            </li>
                            <li className="list-group-item">
                                هزینه سفر : {trip.price}
                            </li>
                            <li className="list-group-item">
                                وضعیت پرداخت :{trip.paymentStatus}
                            </li>
                        </ul>
                    </Card.Title>
                </Card.Body>
            </Card>
        </>
    );
};
