import React from "react";
import {
    useNavigate,
    useParams,
    useLocation,
    useSearchParams,
} from "react-router-dom";

import { PaginationType } from "@taban/dto";

export const useAppParam = () => useParams();

export const useAppNavigate = () => useNavigate();

export const useAppLocation = () => useLocation();

export const useAppSearchParams = () => useSearchParams();

export const useAppParams = () => useParams();

export const useAppQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const useAppPagination = (): PaginationType => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const perPage = Number(params.get("per_page"));
    const currentPage = Number(params.get("current_page"));

    return {
        total: 0,
        perPage: perPage === 0 ? 10 : perPage,
        currentPage: currentPage === 0 ? 1 : currentPage,
    };
};

export const useAppPaginationUrl = () => {
    const { search, pathname } = useLocation();

    return (pagination: PaginationType): string => {
        const params = new URLSearchParams(search);
        params.delete("per_page");
        params.delete("current_page");
        params.append("per_page", pagination.perPage.toString());
        params.append("current_page", pagination.currentPage.toString());
        return pathname + "?" + params.toString();
    };
};

export const redirectLocation = (path: string) => {
    return window.location.replace(path);
};
