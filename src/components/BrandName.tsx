"use client";

import React from 'react';

interface BrandNameProps {
    name: string;
    className?: string;
}

export default function BrandName({ name }: BrandNameProps) {
    if (!name) return null;

    return (
        <>
            {name.split('®').map((part, index, array) => (
                <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && (
                        <sup className="text-[0.6em] ml-0.5 leading-none font-bold">®</sup>
                    )}
                </React.Fragment>
            ))}
        </>
    );
}
