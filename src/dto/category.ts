import { ContentType } from "@taban/dto/content";

export type CategoryType = {
    id: number;
    status: "activate" | "deactivate";
    title: string;
    description: string;
    parent_id: number;
    top_parent_id: number;
    contents: ContentType;
};

export type CategoryList = {
    category: CategoryType;
    children: CategoryList[];
};

export type CategoryEditType = {
    title: string;
    description: string;
    contents: ContentType;
};
