import { FormikErrors } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { GetList } from "@taban/api/category";
import { CategoryList, CategoryType } from "@taban/dto";
import { useAppSelector, User } from "@taban/redux-config";

export const CategorySearch: FC<{
    formPrefix: string;
    yupError: string | string[] | FormikErrors<CategoryType>[] | undefined;
    setCategory: Function;
    defaultValue: CategoryType[];
}> = ({ formPrefix, yupError, setCategory, defaultValue }) => {
    const [categoryList, setCategoryList] = useState<CategoryList>();
    const [categorySelectedList, setCategorySelectedList] =
        useState<CategoryType[]>(defaultValue);
    const [showModal, setShowModal] = useState(false);

    const { t } = useTranslation("category");

    const user = useAppSelector(User.selectUser);

    useEffect(() => {
        if (!categoryList) {
            GetList(user).then((data: any) => {
                setCategoryList(data.categories);
            });
        }
    }, []);

    useEffect(() => {
        setCategory(categorySelectedList);
    }, [categorySelectedList]);

    const searchCategory = (id: number) => {
        GetList(user, id).then((data: any) => {
            setCategoryList(data.categories);
        });
    };

    const addToSelectedList = (item: CategoryList) => {
        let check = false;
        categorySelectedList.forEach((element) => {
            if (element.id == item.category.id) {
                check = true;
            }
        });
        if (!check) {
            setCategorySelectedList([...categorySelectedList, item.category]);
        }
    };
    const deleteFromSelectedList = (id: number) => {
        const list: CategoryType[] = [];
        categorySelectedList.forEach((element) => {
            if (element.id != id) {
                list.push(element);
            }
        });
        setCategorySelectedList(list);
    };

    return (
        <div className="position-relative">
            <Form.Group
                controlId={`${formPrefix}store`}
                className="position-relative"
            >
                <Form.Label onClick={() => setShowModal(true)}>
                    {t("category")}
                </Form.Label>

                <Form.Label
                    className="border border-1 p-2 rounded w-100"
                    style={{ minHeight: "40px" }}
                >
                    <div className="d-flex flex-row flex-wrap">
                        <Button
                            className="btn-light text-center"
                            onClick={() => setShowModal(true)}
                        >
                            {t("add")}
                        </Button>
                        {categorySelectedList.map((item: CategoryType) => (
                            <span
                                key={item.id}
                                className="bg-light mx-1 p-1 mb-1 border rounded"
                            >
                                {item.title}
                                <Button
                                    className="btn-light text-danger"
                                    onClick={() =>
                                        deleteFromSelectedList(item.id)
                                    }
                                >
                                    ×
                                </Button>
                            </span>
                        ))}
                    </div>
                </Form.Label>
                <Form.Control
                    aria-label="category"
                    className="d-none"
                    name="category"
                    placeholder={t("category")}
                    onChange={(e: any) => {
                        searchCategory(e);
                    }}
                    value={"select"}
                    isInvalid={!!yupError}
                />
                <Form.Control.Feedback type="invalid">
                    {yupError + ""}
                </Form.Control.Feedback>
            </Form.Group>
            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header closeButton>
                    <Button
                        className="btn-light mx-2"
                        onClick={() => {
                            searchCategory(
                                Number(categoryList?.category.parent_id),
                            );
                        }}
                        disabled={categoryList?.category.parent_id == null}
                    >
                        {t("back")}
                    </Button>
                    <Modal.Title>{categoryList?.category.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className="d-flex flex-column flex-no-wrap overflow-auto"
                        style={{ maxHeight: "400px" }}
                    >
                        {categoryList?.children.map((item) => (
                            <div
                                key={item.category.id}
                                className="d-flex flex-row align-items-center justify-content-between bg-light mb-1 px-3"
                            >
                                <div
                                    className="category-search-label"
                                    onClick={() => addToSelectedList(item)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span>{item.category.title}</span>
                                </div>
                                <div className="d-flex flex-row">
                                    <Button
                                        onClick={() => addToSelectedList(item)}
                                        className="btn-light text-nowrap"
                                    >
                                        {t("add")}
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            searchCategory(item.category.id)
                                        }
                                        className="btn-light text-nowrap"
                                    >
                                        {t("more")}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex flex-row flex-wrap">
                        {categorySelectedList.map((item: CategoryType) => (
                            <span
                                key={item.id}
                                className="bg-light p-1 mx-1 mb-1 border rounded"
                            >
                                {item.title}
                                <Button
                                    className="btn-light text-danger"
                                    onClick={() =>
                                        deleteFromSelectedList(item.id)
                                    }
                                >
                                    ×
                                </Button>
                            </span>
                        ))}
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
