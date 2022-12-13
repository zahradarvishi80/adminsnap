import { AdminType } from "@taban/dto";
export type UserStateType = {
    value: AdminType;
    status: "idle" | "loading" | "failed" | "auth" | "unAuth";
    loginProcessStatus: "idle" | "loading" | "failed";
    message: string[] | any;
};
