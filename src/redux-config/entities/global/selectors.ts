import { RootState } from "@taban/redux-config/store";

export const selectLoader = (state: RootState) => state.global.loader;
