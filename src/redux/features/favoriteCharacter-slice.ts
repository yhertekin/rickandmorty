import { createSlice, current } from "@reduxjs/toolkit";
import { ICharacterResponse } from "@/interfaces/ICharacter";

type FavoriteCharactersState = {
    favoriteCharacters: ICharacterResponse[];
};

const initialState: FavoriteCharactersState = {
    favoriteCharacters: JSON.parse(localStorage.getItem("favoriteCharacters") ?? "[]"),
};

export const favoriteCharacters = createSlice({
    name: "favoriteCharacters",
    initialState,
    reducers: {
        addFavoriteCharacter: (state, action) => {
            const exists = state.favoriteCharacters.some((character) => character.id === action.payload.id);
            if (!exists) {
                state.favoriteCharacters.push(action.payload);
                localStorage.setItem("favoriteCharacters", JSON.stringify(current(state.favoriteCharacters)));
            }
        },
        removeFavoriteCharacter: (state, action) => {
            const id = action.payload;
            const favoriteCharacters = state.favoriteCharacters.filter((character) => character.id !== id);
            state.favoriteCharacters = favoriteCharacters;
            localStorage.setItem("favoriteCharacters", JSON.stringify(state.favoriteCharacters));
        },
    },
});

export const { addFavoriteCharacter, removeFavoriteCharacter } = favoriteCharacters.actions;

export default favoriteCharacters.reducer;
