import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import { Wrapper, BreadCrumb } from "@taban/component";
import {
    useAppDispatch,
    useAppSelector,
    User,
    Global,
} from "@taban/redux-config";
import { ContactUsForm } from "@taban/forms";
import { ContactUsApi } from "@taban/api";
import { useAppNavigate } from "@taban/route";
import {
    setLoaderDown,
    setLoaderUp,
} from "@taban/redux-config/entities/global";
import { ContactUsType } from "@taban/dto";

export const ContactUs = () => {
    const [contactUs, setContactUS] = useState<ContactUsType>({
        phone_number: [],
        address: "",
        social_media: [],
    });
    const [currentPhoneNumbers, setCurrentPhoneNumbers] = useState<string[]>(
        [],
    );

    const { t } = useTranslation("contact_us");

    const dispatch = useAppDispatch();
    const user = useAppSelector(User.selectUser);

    const navigate = useAppNavigate();
    const crumbs = [
        { name: t(""), href: "" },
        { name: t("home"), href: "/" },
        { name: t("contactUs"), href: "#" },
    ];
    useEffect(() => {
        dispatch(setLoaderUp());
        ContactUsApi.Get(user).then((data: any) => {
            setContactUS(data?.about_us);
            dispatch(setLoaderDown());
        });
    }, []);

    const callbackPhoneNumbers = (phoneNumbers: string[]) => {
        setCurrentPhoneNumbers(phoneNumbers);
    };

    return (
        <>
            <BreadCrumb breadcrumb={crumbs} />
            <Wrapper>
                {contactUs.phone_number.length > 0 && (
                    <section className="d-flex justify-content-center align-items-center">
                        <section className="col-11 col-lg-7">
                            <Formik<ContactUsForm.FormValues>
                                validationSchema={ContactUsForm.ValidationSchema(
                                    currentPhoneNumbers,
                                    t,
                                )}
                                initialValues={{
                                    phone_number: "",
                                    phone_numbers: contactUs.phone_number,
                                    address: contactUs.address,
                                }}
                                onSubmit={(event) => {
                                    dispatch(Global.setLoaderUp());
                                    ContactUsApi.Create(user, {
                                        phone_number: event.phone_numbers,
                                        address: event.address,
                                        social_media: [],
                                    }).then((data) => {
                                        dispatch(Global.setLoaderDown());
                                        navigate(`/`);
                                    });
                                }}
                                component={(props: any) => (
                                    <ContactUsForm.CreateAndEditForm
                                        submitTxt={t("SubmitTextButton")}
                                        callbackPhoneNumbers={
                                            callbackPhoneNumbers
                                        }
                                        {...props}
                                    />
                                )}
                            />
                        </section>
                    </section>
                )}
            </Wrapper>
        </>
    );
};
