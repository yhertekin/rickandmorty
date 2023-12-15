"use client";
import { GetCharactersByLocation } from "@/api/service";
import CharacterCard from "@/components/CharacterCard";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { ICharacterResponse, TCharacterStatus } from "@/interfaces/ICharacter";
import { ILocationResult } from "@/interfaces/ILocation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type TCharacterProps = {
    locationId: number | string;
};

const CharactersPage = () => {
    const [state, setState] = useState<{
        location: ILocationResult | null;
        characters: ICharacterResponse[] | null;
        filteredCharacters: ICharacterResponse[] | null;
        filter: TCharacterStatus | "All";
    }>({
        location: null,
        characters: null,
        filteredCharacters: null,
        filter: "All",
    });

    const searchParams = useSearchParams();
    const locationId = searchParams.get("locationId");

    useEffect(() => {
        if (locationId) {
            GetCharactersByLocation(locationId).then((characters) => {
                setState((prevState) => ({
                    ...prevState,
                    characters: characters ?? [],
                    filteredCharacters: characters ?? [],
                }));
            });
        }
    }, [locationId]);

    const filterHandler = (status: TCharacterStatus) => {
        if (status === state.filter) {
            return setState((prevState) => ({ ...prevState, filteredCharacters: prevState.characters, filter: "All" }));
        }
        setState((prevState) => {
            if (prevState.characters) {
                const filteredCharacters = prevState?.characters.filter((character) => character.status === status);
                return {
                    ...prevState,
                    filteredCharacters: filteredCharacters,
                    filter: status,
                };
            }
            return { ...prevState };
        });
    };

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <div>
            <Navigation />
            <div className='characters__page'>
                <div>
                    <div>
                        <span>Filter By Status</span>
                        <Link href='/character/favorites'>My Favorites</Link>
                    </div>
                    <div className='characters__page__filters'>
                        <button
                            className={`status status--alive ${state.filter === "Alive" ? "selected" : ""}`}
                            onClick={() => filterHandler("Alive")}
                        >
                            Alive
                        </button>
                        <button
                            className={`status status--dead ${state.filter === "Dead" ? "selected" : ""}`}
                            onClick={() => filterHandler("Dead")}
                        >
                            Dead
                        </button>
                        <button
                            className={`status status--unknown ${state.filter === "unknown" ? "selected" : ""}`}
                            onClick={() => filterHandler("unknown")}
                        >
                            Unknown
                        </button>
                    </div>
                </div>
                <div className='characters__page__characters'>
                    {state?.filteredCharacters &&
                        state?.filteredCharacters?.length > 0 &&
                        state?.filteredCharacters.map((character) => (
                            <CharacterCard character={character} key={character.id} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default CharactersPage;
