import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowCircle from "@/assets/icons/ArrowCircleLeft.svg";

const Navigation = () => {
    const router = useRouter();
    return (
        <div className='navigation'>
            <Image src={ArrowCircle} alt='Go Back' width={50} height={50} onClick={() => router.back()} />
        </div>
    );
};

export default Navigation;
