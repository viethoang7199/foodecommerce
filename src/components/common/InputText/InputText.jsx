import React from 'react';

const InputText = ({ placeholder, value, name, className, onChange, type }) => {
    return (
        <input
            type={`${type}`}
            className={`text-base border-b border-dark-blue outline-1 outline-none ${className}`}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
        />
    );
};

export default InputText;