export interface ICharacterResponse {
    id: number;
    name: string;
    status: TCharacterStatus;
    species: string;
    type: string;
    gender: TCharacterGender;
    origin: TOrigin;
    location: TLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export type TCharacterStatus = "alive" | "dead" | "unknown";

export type TCharacterGender = "female" | "male" | "genderless" | "unknown";

export type TOrigin = {
    name: string;
    url: string;
};

export type TLocation = {
    name: string;
    url: string;
};
