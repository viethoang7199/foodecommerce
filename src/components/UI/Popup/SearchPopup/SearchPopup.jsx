import React from "react";
import { FaTimes } from 'react-icons/fa';
import InputText from '../../../common/InputText/InputText'

const SearchPopup = ({ onHandleCloseSearchPopup, className }) => {

    return (
        <div className={`absolute top-0 z-50 w-full -translate-y-full transition-all duration-500 ease-in-out opacity-0 ${className} `}>
            <div className="w-full">
                <div className="bg-white w-full mx-auto px-4 pt-14 pb-6 relative h-[500px]">
                    <span className="absolute top-5 right-5">
                        <FaTimes
                            className="text-white bg-black hover:bg-pink w-7 h-7 p-2 rounded-full cursor-pointer"
                            onClick={onHandleCloseSearchPopup} />
                    </span>
                    <p className="text-black font-semibold text-3xl text-center">
                        What are you looking for?
                    </p>
                    <div className="text-center md:w-7/12 pt-10 m-auto">
                        <InputText
                            type='text'
                            className='w-3/4 md:w-full'
                            placeholder='Search...'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchPopup;