import { addFavoriteCharacter, removeFavoriteCharacter } from "@/redux/features/favoriteCharacter-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ICharacterResponse } from "@/interfaces/ICharacter";
import FavoriteFilled from "@/assets/icons/FavoriteFilled.svg";
import FavoriteEmpty from "@/assets/icons/FavoriteEmpty.svg";
import NavigateNext from "@/assets/icons/NavigateNext.svg";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type TCharacterCardProps = {
    character: ICharacterResponse;
    detailed: boolean;
};

const CharacterCard = ({ character, detailed }: TCharacterCardProps) => {
    const [state, setState] = useState<{ inFavorites: boolean }>({ inFavorites: false });
    const favoriteCharactersList = useSelector((state: RootState) => state.favoriteCharacterReducer.favoriteCharacters);
    const dispatch = useDispatch<AppDispatch>();

    const handleFavorite = () => {
        if (state.inFavorites) {
            return dispatch(removeFavoriteCharacter(character.id));
        }
        dispatch(addFavoriteCharacter(character));
    };

    useEffect(() => {
        const check = favoriteCharactersList.filter((favoriteChracter) => favoriteChracter?.id === character.id);
        setState((prevState) => ({ ...prevState, inFavorites: check.length > 0 }));
    }, [favoriteCharactersList]);

    return (
        <div className='character'>
            <div className='character__image__container'>
                <Image
                    src={state.inFavorites ? FavoriteFilled : FavoriteEmpty}
                    className='character__image__container__favorite'
                    alt='Favorite'
                    width='50'
                    height='50'
                    onClick={handleFavorite}
                />
                <Image
                    fill
                    className='character__image__container__image'
                    src={character.image}
                    alt={character.name}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
            </div>
            <div className='character__info'>
                <div>
                    <Link href={`/character/${character.id}`}>
                        <h1 className='character__info__name'>{character.name}</h1>
                    </Link>
                    <p
                        className={`character__info__status character__info__status--${character.status.toLocaleLowerCase()}`}
                    >
                        {character.status} - {character.species}
                    </p>
                </div>
                {detailed ? (
                    <div className='character__detail'>
                        <span className='character__detail__type'>{character.type}</span>
                        <span className='character__detail__gender'>{character.gender}</span>
                    </div>
                ) : (
                    <div className='character__select'>
                        <Image src={NavigateNext} width='40' height='40' alt='Select Character' />
                    </div>
                )}
                {detailed && <div className='character__origin'>{character.origin.name}</div>}
            </div>
        </div>
    );
};

export default CharacterCard;
