"use client";
import React from "react";
import RickAndMorty from "@/assets/images/RickAndMorty.svg";
import Image from "next/image";
import "@/styles/style.scss";

const Header = () => {
    return (
        <header className='header'>
            <div className='header__image__container'>
                <Image src={RickAndMorty} fill alt='Rick and Morty Logo' />
            </div>
        </header>
    );
};

export default Header;
