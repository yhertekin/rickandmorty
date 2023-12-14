import { addFavoriteCharacter, removeFavoriteCharacter } from "@/redux/features/favoriteCharacter-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ICharacterResponse } from "@/interfaces/ICharacter";
import Image from "next/image";
import React from "react";

type TCharacterCardProps = {
    character: ICharacterResponse;
    detailed: boolean;
};

const CharacterCard = ({ character, detailed }: TCharacterCardProps) => {
    const favoriteCharactersList = useSelector((state: RootState) => state.favoriteCharacterReducer.favoriteCharacters);
    const dispatch = useDispatch<AppDispatch>();

    const handleAdd = () => {
        dispatch(addFavoriteCharacter(character));
    };

    const handleRemove = () => {
        dispatch(removeFavoriteCharacter(character.id));
    };

    return (
        <div className='character'>
            <button onClick={handleAdd}>Add To Favorite</button>
            <button onClick={handleRemove}>Remove From Favorite</button>

            {favoriteCharactersList &&
                favoriteCharactersList.map((character) => <div key={character.id}>Favorite: {character.name}</div>)}
            <div style={{ position: "relative", width: "100px", height: "100px", borderRadius: "20px" }}>
                <Image
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                    className='character__image'
                    src={character.image}
                    fill
                    alt={character.name}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
            </div>
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
