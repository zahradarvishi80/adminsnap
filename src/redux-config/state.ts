import { GlobalStateType } from "@taban/redux-config/entities/global";
import { UserStateType } from "@taban/redux-config/entities/user";
import { AdminTestStateType } from "./entities/admin";
export type RootState = {
    user: UserStateType;
    global: GlobalStateType;
    adminTest:AdminTestStateType
};
