import Link from "next/link";
import React, { useEffect } from "react";

type TPaginationFooterProps = {
    pageCount: number;
    pathname: "location" | "character";
    currentPage: number;
} & React.HTMLAttributes<HTMLDivElement>;

const PaginationFooter = ({ pageCount, pathname, currentPage, className }: TPaginationFooterProps) => {
    return (
        <div className={`pagination-footer ${className}`}>
            {Array.from({ length: pageCount }).map((v, pageNumber: number) => (
                <Link
                    className={`pagination-footer__link pagination-footer__link--${
                        currentPage === pageNumber + 1 && "current"
                    }`}
                    href={{ pathname: pathname, query: { page: pageNumber + 1 } }}
                    key={pageNumber}
                >
                    {pageNumber + 1}
                </Link>
            ))}
        </div>
    );
};

export default PaginationFooter;
