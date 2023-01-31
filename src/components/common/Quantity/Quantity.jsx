import React from 'react';

const Quantity = ({ onHandleDecreaseQty, onHandleIncreaseQty, valueQty }) => {

    return (
        <div className='quantity inline-flex items-center justify-center'>
            <button className='quantity__btn w-6 h-6 font-bold text-lg p-0 flex justify-center items-center'
                onClick={onHandleDecreaseQty}
            >-</button>
            <div className='quantity__input w-12 h-6 font-bold mx-2 p-0 outline-none flex justify-center items-center text-base'>
                {valueQty}
            </div>
            <button className='quantity__btn w-6 h-6 font-bold text-lg p-0 flex justify-center items-center'
                onClick={onHandleIncreaseQty}
            >+</button>
        </div>
    );
};

export default Quantity;