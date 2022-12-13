import { ContentType } from "@taban/dto/content";

export type SocialMediaType = {
    id?: number;
    status: "social_media_activate" | "social_media_deactivate";
    title: string;
    content: ContentType;
};
