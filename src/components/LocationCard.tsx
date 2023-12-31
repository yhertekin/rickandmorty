import React from "react";
import { ILocationResult } from "@/interfaces/ILocation";
import NavigateNext from "@/assets/icons/NavigateNext.svg";

import Image from "next/image";

type TLocationCardProps = {
    location: ILocationResult;
};

const LocationCard = ({ location }: TLocationCardProps) => {
    return (
        <div className='location'>
            <div className='location__content'>
                <div className='location__content__title'>
                    <span>Name</span>
                    <span>Type</span>
                    <span>Dimension</span>
                    <span>Resident Count</span>
                </div>
                <div className='location__content__info'>
                    <span>{location.name}</span>
                    <span>{location.type}</span>
                    <span>{location.dimension}</span>
                    <span>{location.residents.length}</span>
                </div>
            </div>
            <div className='location__select'>
                <Image src={NavigateNext} width='40' height='40' alt='Select Location' />
            </div>
        </div>
    );
};

export default LocationCard;
