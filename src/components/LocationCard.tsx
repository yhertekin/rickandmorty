import React from "react";
import { ILocationResult } from "@/interfaces/ILocation";
import RightArrow from "@/assets/icons/RightArrow.svg";
import Image from "next/image";

type TLocationCardProps = {
    location: ILocationResult;
};

// name
// type
// dimension
// resident type

const LocationCard = ({ location }: TLocationCardProps) => {
    return (
        <div className='location'>
            <div className='location__content'>
                <div className='location__content__title'>
                    <span>Name</span>
                    <span>Type</span>
                    <span>Dimenstion</span>
                    <span>Resident Count</span>
                </div>
                <div className='location__content__info'>
                    <span>{location.name}</span>
                    <span>{location.type}</span>
                    <span>{location.dimension}</span>
                    <span>{location.residents.length}</span>
                </div>
            </div>
            {/* <div className="location__select">
				<Image src={RightArrow} width="50" height="50" alt="" />
			</div> */}
        </div>
    );
};

export default LocationCard;
