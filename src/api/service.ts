import { ILocationResponse } from "@/interfaces/ILocation";

export const BaseEndpoint = "https://rickandmortyapi.com/api";
export const LocationsEndpoint = BaseEndpoint + "/location";
export const CharactersEndpoint = BaseEndpoint + "/character";

export const GetLocationsByPage = async (pageQuery: string): Promise<ILocationResponse | null> => {
    console.log("GetLocationByPage Address: ", `${LocationsEndpoint}?page=${pageQuery}`);
    let response = await fetch(`${LocationsEndpoint}?page=${pageQuery}`);

    if (response.ok) {
        let data = await response.json();
        return data as ILocationResponse;
    }

    return null;
};
