"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { getFavoriteCharactersFromLocalStorage } from "./features/favoriteCharacter-slice";

const InitializeReduxState = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();

    const localFavoriteCharacters =
        typeof window !== "undefined" ? JSON.parse(localStorage.getItem("favoriteCharacters") ?? "[]") : [];

    useEffect(() => {
        dispatch(getFavoriteCharactersFromLocalStorage(localFavoriteCharacters));
    }, []);
    return <div>{children}</div>;
};

export default InitializeReduxState;
