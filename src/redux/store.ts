import { configureStore } from "@reduxjs/toolkit";
import favoriteCharacterReducer from "./features/favoriteCharacter-slice";

export const store = configureStore({
    reducer: {
        favoriteCharacterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
