"use client";

import { GetLocationsByPage } from "@/api/service";
import Header from "@/components/Header";
import LocationCard from "@/components/LocationCard";
import Navigation from "@/components/Navigation";
import PaginationFooter from "@/components/PaginationFooter";
import { ILocationInfo, ILocationResponse, ILocationResult } from "@/interfaces/ILocation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TLocationProps = {
    page: number | string;
};

const LocationsPage = () => {
    const [state, setState] = useState<{ locations: ILocationResponse | null }>({
        locations: null,
    });
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";

    const getData = async (page: string) => {
        GetLocationsByPage(page).then((locationResponse) => {
            setState((prevState) => ({
                ...prevState,
                locations: locationResponse,
            }));
        });
    };

    useEffect(() => {
        if (page == searchParams.get("page")) {
            getData(page);
        }
    }, [page]);

    return (
        <main className='location__page'>
            <div className='location__page__list'>
                {state.locations &&
                    state.locations.results.map((location) => (
                        <Link href={{ pathname: "character", query: { locationId: location.id } }} key={location.id}>
                            <LocationCard location={location} />
                        </Link>
                    ))}
            </div>

            {state.locations && state.locations.info && (
                <PaginationFooter
                    currentPage={Number(page)}
                    pageCount={state.locations.info.pages}
                    pathname='location'
                    className='location__page__footer'
                />
            )}
        </main>
    );
};

export default LocationsPage;
