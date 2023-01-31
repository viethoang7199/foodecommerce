import React from 'react';

const SectionTitle = ({ name, className }) => {
    return (
        <h3 className={`text-xl xl:text-[40px] lg:text-2xl font-extrabold text-center text-dark-blue pb-2 sm:pb-4 capitalize ${className}`}>{name}</h3>
    );
};

export default SectionTitle;