import { ContentType } from "@taban/dto";

export type FormValues = {
    title: string;
    description: string;
    contents: ContentType[];
};

export type PropType = {
    submitTxt: string;
};

export type EditFormValues = {
    id: number;
    title: string;
    description: string;
    contents: ContentType;
};
