import { combineReducers } from "@reduxjs/toolkit";

import { UserReducer } from "@taban/redux-config/entities/user";
import { GlobalReducer } from "@taban/redux-config/entities/global";
import {AdminTestReducers} from "@taban/redux-config/entities/admin"
const rootReducer = combineReducers({
    user: UserReducer,
    global: GlobalReducer,
    adminTest:AdminTestReducers
});

export default rootReducer;
