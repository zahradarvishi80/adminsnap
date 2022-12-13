import { RootState } from "@taban/redux-config/store";

export const selectAdminTest = (state: RootState) => state.adminTest.value;