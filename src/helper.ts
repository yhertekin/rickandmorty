export const characterIdsFromEndpoint = (endpoints: string[]) =>
    endpoints.map((endpoint) => endpoint.split("/").pop() || "");
