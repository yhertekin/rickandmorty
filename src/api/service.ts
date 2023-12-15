import { characterIdsFromEndpoint } from "@/helper";
import { ICharacterResponse } from "@/interfaces/ICharacter";
import { ILocationResponse, ILocationResult } from "@/interfaces/ILocation";

export const BaseEndpoint = "https://rickandmortyapi.com/api";
export const LocationsEndpoint = BaseEndpoint + "/location";
export const CharactersEndpoint = BaseEndpoint + "/character";

export const GetLocation = async (endpoint: string): Promise<ILocationResult | null> => {
    let response = await fetch(endpoint);

    if (response.ok) {
        let data = await response.json();
        return data as ILocationResult;
    }

    return null;
};

export const GetLocationsByPage = async (pageQuery: string): Promise<ILocationResponse | null> => {
    let response = await fetch(`${LocationsEndpoint}?page=${pageQuery}`);

    if (response.ok) {
        let data = await response.json();
        return data as ILocationResponse;
    }

    return null;
};

export const GetLocationById = async (id: string): Promise<ILocationResult | null> => {
    let response = await fetch(`${LocationsEndpoint}/${id}`);

    if (response.ok) {
        let data = await response.json();
        return data as ILocationResult;
    }

    return null;
};

export const GetCharactersByIds = async (idList: string[]): Promise<ICharacterResponse[] | null> => {
    let response = await fetch(`${CharactersEndpoint}/${idList}`);

    if (response.ok) {
        let data = await response.json();
        return data as ICharacterResponse[];
    }

    return null;
};

export const GetCharacterById = async (id: string): Promise<ICharacterResponse | null> => {
    let response = await fetch(`${CharactersEndpoint}/${id}`);

    if (response.ok) {
        let data = await response.json();
        return data as ICharacterResponse;
    }

    return null;
};

export const GetCharactersByLocation = async (locationId: string): Promise<ICharacterResponse[] | null> => {
    return GetLocationById(locationId).then((locationData) => {
        if (locationData) {
            const characterIds = characterIdsFromEndpoint(locationData?.residents);
            if (characterIds.length > 0) {
                return GetCharactersByIds(characterIds).then((charactersData) => {
                    return (
                        Array.isArray(charactersData)
                            ? charactersData
                            : charactersData !== null
                            ? [charactersData]
                            : null
                    ) as ICharacterResponse[];
                });
            }
            return null;
        }
        return null;
    });
};
