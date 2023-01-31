import React from "react";
import { FaTimes } from 'react-icons/fa';

const SearchPopup = ({ onHandleCloseSearchPopup, className }) => {

    return (
        <div className={`search__popup ${className} `}>
            <div className="w-full">
                <div className="search__popup__content bg-white w-full mx-auto px-4 pt-14 pb-6 relative">
                    <span className="search__popup__content-close">
                        <FaTimes
                            className="text-white bg-black hover:bg-pink"
                            onClick={onHandleCloseSearchPopup} />
                    </span>
                    <p className="text-black font-semibold text-3xl text-center">
                        What are you looking for?
                    </p>
                    <div className="search__popup__content-input text-center w-6/12 pt-10 m-auto">

                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchPopup;