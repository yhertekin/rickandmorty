import { createSlice } from "@reduxjs/toolkit";
import { ICharacterResponse } from "@/interfaces/ICharacter";

type FavoriteCharactersState = {
    favoriteCharacters: ICharacterResponse[];
};

const initialState: FavoriteCharactersState = {
    favoriteCharacters: [],
};

export const favoriteCharacters = createSlice({
    name: "favoriteCharacters",
    initialState,
    reducers: {
        addFavoriteCharacter: (state, action) => {
            const exists = state.favoriteCharacters.some((character) => character.id === action.payload.id);
            if (!exists) {
                state.favoriteCharacters.push(action.payload);
            }
        },
        removeFavoriteCharacter: (state, action) => {
            const id = action.payload;
            const favoriteCharacters = state.favoriteCharacters.filter((character) => character.id !== id);
            state.favoriteCharacters = favoriteCharacters;
        },
    },
});

export const { addFavoriteCharacter, removeFavoriteCharacter } = favoriteCharacters.actions;

export default favoriteCharacters.reducer;
