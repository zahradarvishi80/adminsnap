import { SocialMediaType } from "@taban/dto/social_media";

export type ContactUsType = {
    phone_number: string[];
    address: string;
    social_media: SocialMediaType[];
};

export type ContactUsGetType = {
    about_us: {
        phone_number: string[];
        address: string;
        social_media: SocialMediaType[];
    };
};
