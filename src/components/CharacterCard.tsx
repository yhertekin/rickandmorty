import { ICharacterResponse } from "@/interfaces/ICharacter";
import Image from "next/image";
import React from "react";

type TCharacterCardProps = {
    character: ICharacterResponse;
    detailed: boolean;
};

const CharacterCard = ({ character, detailed }: TCharacterCardProps) => {
    return (
        <div className='character'>
            <Image className='character__image' src={character.image} width={100} height={100} alt={character.name} />
            <div>
                <div>
                    <h1 className='character__name'>{character.name}</h1>
                    <p className='character__status'>
                        {character.status} - {character.species}
                    </p>
                </div>
                {detailed ? (
                    <div className='character__detail'>
                        <span className='character__detail__type'>{character.type}</span>
                        <span className='character__detail__gender'>{character.gender}</span>
                    </div>
                ) : (
                    <div className='character__select'>select</div>
                )}
                {detailed && <div className='character__origin'>{character.origin.name}</div>}
            </div>
        </div>
    );
};

export default CharacterCard;
