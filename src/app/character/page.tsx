"use client";
import { GetCharactersByIds, GetLocationById } from "@/api/service";
import CharacterCard from "@/components/CharacterCard";
import { characterIdsFromEndpoint } from "@/helper";
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
    }>({
        location: null,
        characters: null,
        filteredCharacters: null,
    });

    const searchParams = useSearchParams();
    const locationId = searchParams.get("locationId");
    const status = searchParams.get("status") || "all";

    const getLocationData = async () => {
        if (locationId) {
            GetLocationById(locationId).then((data) => setState((prevState) => ({ ...prevState, location: data })));
        }
    };

    const getCharacterData = async (characterIds: string[]) => {
        GetCharactersByIds(characterIds).then((data) => {
            const dataArr = Array.isArray(data) ? data : data !== null ? [data] : null;
            setState((prevState) => ({
                ...prevState,
                characters: dataArr,
                filteredCharacters: dataArr,
            }));
        });
    };

    useEffect(() => {
        getLocationData();
    }, [locationId]);

    useEffect(() => {
        if (state?.location) {
            const characterIds = characterIdsFromEndpoint(state.location.residents);
            console.log("Character Id", characterIds);
            getCharacterData(characterIds);
        }
    }, [state?.location]);

    useEffect(() => {
        if (status === "all") {
            return setState((prevState) => ({ ...prevState, filteredCharacters: prevState.characters }));
        }
        setState((prevState) => {
            if (prevState.characters) {
                const filteredCharacters = prevState?.characters.filter((character) => character.status === status);
                return {
                    ...prevState,
                    filteredCharacters: filteredCharacters,
                };
            }
            return { ...prevState };
        });
    }, [status]);

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <div>
            <div>
                <Link
                    href={{
                        pathname: "/character",
                        query: { locationId, status: status === "Alive" ? "all" : "Alive" },
                    }}
                >
                    Alive
                </Link>
                <Link
                    href={{
                        pathname: "/character",
                        query: { locationId, status: status === "Dead" ? "all" : "Dead" },
                    }}
                >
                    Dead
                </Link>
                <Link
                    href={{
                        pathname: "/character",
                        query: { locationId, status: status === "Unknown" ? "all" : "Unknown" },
                    }}
                >
                    Unknown
                </Link>
            </div>
            {state?.filteredCharacters &&
                state?.filteredCharacters.map((character) => (
                    <Link href={`/character/${character.id}`} key={character.id}>
                        <CharacterCard character={character} detailed={false} />
                    </Link>
                ))}
        </div>
    );
};

export default CharactersPage;
