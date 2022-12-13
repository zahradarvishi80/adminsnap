import { PaginationType } from "@taban/dto";

export function castApiDateToPagination(data: any): PaginationType {
    return {
        total: data?.total,
        perPage: data?.per_page,
        currentPage: data?.current_page,
    };
}
