"use client";
import { GetCharacterById, GetCharactersByIds, GetLocation, GetLocationById } from "@/api/service";
import CharacterCard from "@/components/CharacterCard";
import { characterIdsFromEndpoint } from "@/helper";
import { ICharacterResponse } from "@/interfaces/ICharacter";
import React, { useEffect, useState } from "react";

type TCharacterDetailsPageProps = {
    id: string;
};

const CharacterDetailsPage = ({ params }: { params: TCharacterDetailsPageProps }) => {
    const [state, setState] = useState<{
        character: ICharacterResponse | null;
        otherCharacters: ICharacterResponse[] | null;
    }>({
        character: null,
        otherCharacters: null,
    });

    const getCharacterData = async () => {
        if (params.id) {
            GetCharacterById(params.id).then((data) => setState((prevState) => ({ ...prevState, character: data })));
        }
    };

    const getOtherCharactersData = async () => {
        if (state.character) {
            GetLocation(state?.character?.location?.url).then((location) => {
                if (location) {
                    const characterIds = characterIdsFromEndpoint(location?.residents);
                    GetCharactersByIds(characterIds).then((data) => {
                        setState((prevState) => ({
                            ...prevState,
                            otherCharacters: Array.isArray(data) ? data : data !== null ? [data] : null,
                        }));
                    });
                }
            });
        }
    };

    useEffect(() => {
        getCharacterData();
    }, [params.id]);

    useEffect(() => {
        getOtherCharactersData();
    }, [state.character]);

    return (
        <div>
            <div>{state?.character && <CharacterCard character={state.character} detailed={true} />}</div>
            <div>Other Characters</div>
            {state.otherCharacters &&
                state.otherCharacters
                    .filter(
                        (otherCharacter) =>
                            otherCharacter.id !== Number(params.id) &&
                            otherCharacter.status === state?.character?.status
                    )
                    .map((otherCharacter) => (
                        <CharacterCard character={otherCharacter} detailed={false} key={otherCharacter.id} />
                    ))}
        </div>
    );
};

export default CharacterDetailsPage;
