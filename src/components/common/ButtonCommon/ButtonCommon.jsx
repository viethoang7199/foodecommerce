import { motion } from 'framer-motion';
import React from 'react';
const ButtonCommon = ({ onClick, name, type, className, }) => {

    return (
        <motion.button
            whileTap={{ scale: 0.8 }}
            className={`btn__common font-semibold capitalize text-white hover:!text-white hover:!bg-dark-blue text-lg bg-pink h-full rounded-2xl py-2 px-4 duration-500 ease-in overflow-hidden border-none ${className}`}
            onClick={onClick}
            type={type}
        >

            {name}

        </motion.button>
    );
};
export default ButtonCommon;