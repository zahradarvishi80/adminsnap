import { RootState } from "@taban/redux-config/store";

export const selectUser = (state: RootState) => state.user.value;
export const selectUserMessage = (state: RootState) => state.user.message;
export const selectToken = (state: RootState) => state.user.value.token;
