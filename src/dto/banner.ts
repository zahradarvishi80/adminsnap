import { ContentType } from "@taban/dto/content";

export type BannerType = {
    id?: number;
    status: "banner_activate" | "banner_deactivate";
    title: string;
    content: ContentType;
};
