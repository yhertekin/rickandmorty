"use client";

import { GetLocationsByPage } from "@/api/service";
import LocationCard from "@/components/LocationCard";
import PaginationFooter from "@/components/PaginationFooter";
import { ILocationResponse } from "@/interfaces/ILocation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type TLocationProps = {
    page: number | string;
};

const LocationsPage = () => {
    const [state, setState] = useState<ILocationResponse | null>();
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";

    const getData = async (page: string) => {
        GetLocationsByPage(page).then((locationResponse) => setState(locationResponse));
    };

    useEffect(() => {
        getData(page);
    }, [page]);

    useEffect(() => {
        console.log("Location Page State: ", state);
    }, [state]);

    return (
        <main>
            <div>
                {state?.results.map((location) => (
                    <Link
                        href={{ pathname: "character", query: { locationId: location.id, status: "all" } }}
                        key={location.id}
                    >
                        <LocationCard location={location} />
                    </Link>
                ))}
            </div>

            {state?.info && <PaginationFooter pageCount={state?.info.pages} pathname='location' />}
        </main>
    );
};

export default LocationsPage;
