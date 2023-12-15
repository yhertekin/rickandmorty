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

export type TCharacterStatus = "Alive" | "Dead" | "unknown";

export type TCharacterGender = "Female" | "Male" | "Genderless" | "Unknown";

export type TOrigin = {
    name: string;
    url: string;
};

export type TLocation = {
    name: string;
    url: string;
};
