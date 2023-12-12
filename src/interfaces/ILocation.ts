export interface ILocationResponse {
    info: ILocationInfo;
    results: ILocationResult[];
}

export interface ILocationInfo {
    count: number;
    pages: number;
    next: string | null;
    pren: string | null;
}

export interface ILocationResult {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}
