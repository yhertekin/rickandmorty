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
            {favoriteCharactersList.length > 0 &&
                favoriteCharactersList.map((favorite) => (
                    <CharacterCard character={favorite} detailed={true} key={favorite.id} />
                ))}
        </div>
    );
};

export default FavoriteCharactersPage;
