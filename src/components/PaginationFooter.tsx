import Link from "next/link";
import React, { useEffect } from "react";

type TPaginationFooterProps = {
    pageCount: number;
    pathname: "location" | "character";
};

const PaginationFooter = ({ pageCount, pathname }: TPaginationFooterProps) => {
    useEffect(() => {
        console.log("PaginationFooter Component Mounted");
    }, []);
    return (
        <div>
            pagination footer
            {Array.from({ length: pageCount }).map((v, pageNumber: number) => (
                <Link href={{ pathname: pathname, query: { page: pageNumber + 1 } }} key={pageNumber}>
                    {pageNumber + 1}
                </Link>
            ))}
        </div>
    );
};

export default PaginationFooter;
