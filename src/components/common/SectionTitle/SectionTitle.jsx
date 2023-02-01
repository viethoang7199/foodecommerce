import React from 'react';

const SectionTitle = ({ name, className }) => {
    return (
        <h3 className={`text-2xl md:text-3xl xl:text-[40px] font-extrabold text-center text-dark-blue pb-2 sm:pb-4 capitalize ${className}`}>{name}</h3>
    );
};

export default SectionTitle;