"use client";
import CharacterCard from "@/components/CharacterCard";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const FavoriteCharactersPage = () => {
    const favoriteCharactersList = useSelector((state: RootState) => state.favoriteCharacterReducer.favoriteCharacters);

    useEffect(() => {
        console.log(favoriteCharactersList);
    }, []);

    return (
        <div>
            {favoriteCharactersList &&
                favoriteCharactersList.map((favorite) => <CharacterCard character={favorite} detailed={true} />)}
        </div>
    );
};

export default FavoriteCharactersPage;
