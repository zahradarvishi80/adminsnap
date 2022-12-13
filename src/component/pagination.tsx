import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { range } from "lodash";

import { PaginationType } from "@taban/dto";
import { useAppPaginationUrl, useAppNavigate } from "@taban/route";

export const AppPagination: React.FC<{ pagination: PaginationType }> = ({
    pagination,
}) => {
    const offsetOfShow = 3;
    const minPage = 1;

    let totalPage = Math.ceil(pagination.total / pagination.perPage);

    if (pagination.currentPage > totalPage) {
        totalPage = pagination.currentPage;
    }

    const min =
        pagination.currentPage - offsetOfShow > minPage
            ? pagination.currentPage - offsetOfShow
            : minPage;

    const max =
        pagination.currentPage + offsetOfShow > totalPage
            ? totalPage
            : pagination.currentPage + offsetOfShow;

    const renderAblePage = range(min, max + 1);

    const appPaginationUrl = useAppPaginationUrl();

    const beforeItems = () => {
        if (min > 1) {
            let url = appPaginationUrl({
                total: 0,
                perPage: pagination.perPage,
                currentPage: 1,
            });
            return (
                <>
                    <Pagination.Item as="a" href={url}>
                        {minPage}
                    </Pagination.Item>
                    <Pagination.Ellipsis />
                </>
            );
        } else {
            return "";
        }
    };

    const afterItems = () => {
        if (max < totalPage) {
            let url = appPaginationUrl({
                total: 0,
                perPage: pagination.perPage,
                currentPage: totalPage,
            });
            return (
                <>
                    <Pagination.Ellipsis />
                    <Pagination.Item as="a" href={url}>
                        {totalPage}
                    </Pagination.Item>
                </>
            );
        } else {
            return "";
        }
    };

    const beforePage = () => {
        if (pagination.currentPage > 1) {
            let url = appPaginationUrl({
                total: 0,
                perPage: pagination.perPage,
                currentPage: pagination.currentPage - 1,
            });

            return (
                <>
                    <Pagination.First as="a" href={url} />
                </>
            );
        }
    };

    const nextPage = () => {
        if (pagination.currentPage < max) {
            let url = appPaginationUrl({
                total: 0,
                perPage: pagination.perPage,
                currentPage: pagination.currentPage + 1,
            });
            return (
                <>
                    <Pagination.Last as="a" href={url} />
                </>
            );
        }
    };

    const items = () =>
        renderAblePage.map((item) => {
            let activeItem = pagination.currentPage === item;
            let url = appPaginationUrl({
                total: 0,
                perPage: pagination.perPage,
                currentPage: item,
            });
            return (
                <>
                    <Pagination.Item as="a" href={url} active={activeItem}>
                        {item}
                    </Pagination.Item>
                </>
            );
        });

    return (
        <Pagination className="justify-content-center">
            {beforePage()}
            {beforeItems()}
            {items()}
            {afterItems()}
            {nextPage()}
        </Pagination>
    );
};
