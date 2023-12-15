"use client";
import CharacterCard from "@/components/CharacterCard";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
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
            <Navigation />
            <div className='favorites__page'>
                {favoriteCharactersList.length > 0 &&
                    favoriteCharactersList.map((favorite) => (
                        <CharacterCard character={favorite} style='detailed' key={favorite.id} />
                    ))}
            </div>
        </div>
    );
};

export default FavoriteCharactersPage;
