"use client";
import { GetCharactersByIds, GetLocationById } from "@/api/service";
import CharacterCard from "@/components/CharacterCard";
import { characterIdsFromEndpoint } from "@/helper";
import { ICharacterResponse } from "@/interfaces/ICharacter";
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
    }>({
        location: null,
        characters: null,
    });

    const searchParams = useSearchParams();
    const locationId = searchParams.get("locationId");

    const getLocationData = async () => {
        if (locationId) {
            GetLocationById(locationId).then((data) => setState((prevState) => ({ ...prevState, location: data })));
        }
    };

    const getCharacterData = async (characterIds: string[]) => {
        GetCharactersByIds(characterIds).then((data) =>
            setState((prevState) => ({
                ...prevState,
                characters: Array.isArray(data) ? data : data !== null ? [data] : null,
            }))
        );
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
        console.log(state);
    }, [state]);

    return (
        <div>
            {state?.characters &&
                state?.characters.map((character) => (
                    <Link href={`/character/${character.id}`} key={character.id}>
                        <CharacterCard character={character} detailed={false} />
                    </Link>
                ))}
        </div>
    );
};

export default CharactersPage;
