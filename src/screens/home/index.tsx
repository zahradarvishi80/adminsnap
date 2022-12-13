
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector, User } from "@taban/redux-config";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { useAppParam, useAppLocation } from "@taban/route";
import { Notfound, BreadCrumb, Wrapper } from "@taban/component";
import { AdminTest } from "@taban/api";
import { AdminAuthType } from "@taban/dto";
import { useSelector } from "react-redux";
import { fetchAdmintest, selectAdminTest} from "../../redux-config/entities/admin"
export const Home = () => {
    const { t } = useTranslation("home");
    // const dispatch=useAppDispatch()

    const dataa=useSelector(selectAdminTest)
    // console.log("dataaa",dataa);
    
    const [adminTest, setAdminTest] = useState<AdminAuthType>({
        id: 0,
        username: "",
        phoneNumber: "",
        lastName: "",
        firstName: "",
        status: "active",
        roles: "",
    });



    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "#" },
    ];

    const { state }: any = useAppLocation();
    const dispatch = useAppDispatch();

    const user = useAppSelector(User.selectUser);

    useEffect(() => {
        if (!state) {
            dispatch(setLoaderUp());
            AdminTest.Get(user)
                .then((data: any) => {

                    setAdminTest(data.auth)
                    dispatch(setLoaderDown());
                })
                .catch((data) => {
                    dispatch(setLoaderDown());
                    const code = data.response.status;

                })

        }
    }, []);


    useEffect(()=>{
        dispatch(fetchAdmintest(user)).then((value)=>{
console.log("redux",value)
        })
    },[])

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />
            <Wrapper>
                <h1>{t("pageHomeText")}</h1>

                <div className="card">
                    <div className="card-header">
                        ادمین
                    </div>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">  {t("adminNumber")}:{adminTest.id}</li>
                        <li className="list-group-item">نام کاربری:{adminTest.username}</li>
                        <li className="list-group-item">نام کاربری:{adminTest.lastName}</li>
                        <li className="list-group-item">شماره تلفن:{adminTest.phoneNumber}</li>

                    </ul>
                </div>
              
                <div className="card">
                    <div className="card-header">
                       ریداکس ادمین
                    </div>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item"> شماره ادمین:{dataa.id}</li>
                        <li className="list-group-item">نام کاربری:{dataa.username}</li>
                        <li className="list-group-item">نام کاربری:{dataa.lastName}</li>
                        <li className="list-group-item">شماره تلفن:{dataa.phoneNumber}</li>

                    </ul>
                </div>


                <div>
                    <button
                        className="my-1"
                        onClick={() => {
                            throw Error("this is me");
                        }}
                    >
                        {t("BreakTheWorld")}
                    </button>

                </div>
            </Wrapper>
        </>
    );
};
