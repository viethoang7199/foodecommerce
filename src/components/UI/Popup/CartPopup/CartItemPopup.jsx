import { motion } from 'framer-motion';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { cartSlice } from '../../../../store/Slice/cartSlice';
import Quantity from '../../../common/Quantity/Quantity';

const CartItem = ({ cartItem }) => {
    const { id, productName, price, photoURL, discounted, quantity } = cartItem;
    const dispatch = useDispatch();

    const increaseItem = () => {
        dispatch(
            cartSlice.actions.ADD_ITEM({
                id,
                productName,
                price,
                photoURL,
                discounted
            })
        );
    };

    const decreaseItem = () => {
        dispatch(cartSlice.actions.DECREASE(id));
    };

    const removeCartItem = () => {
        dispatch(cartSlice.actions.REMOVE_ITEM(id));
        toast.success('The product has been removed from the cart');
    }

    return (
        <div className='cartitem mb-3'>
            <div className='cartitem__item bg-light-green rounded-lg flex relative'>
                <motion.div
                    whileTap={{ scale: 0.6 }}
                    className='cartitem__item__remove absolute top-2 right-2 cursor-pointer p-1 text-white bg-pink rounded-full hover:scale-125 active:text-dark-pink'
                >
                    <FaTimes className='text-sm' onClick={removeCartItem} />
                </motion.div>
                <div className='cartitem__item__image w-20 mx-3 flex justify-center items-center'>
                    <img className='cartitem__item__image-img' src={photoURL} alt={productName} />
                </div>

                <div className='cartitem__item__content w-full p-4 flex flex-col justify-between'>
                    <h5 className='cartitem__item__content-title mb-2 font-bold capitalize'>{productName}</h5>
                    <div className='cartitem__item__content__bot flex justify-between items-center w-full'>
                        <span className='cartitem__item__content__bot-price text-pink font-semibold'>
                            ${discounted || price}
                        </span>
                        <div className='cartitem__item__content__bot-qty flex justify-center items-center h-7'>
                            <Quantity
                                onHandleDecreaseQty={decreaseItem}
                                onHandleIncreaseQty={increaseItem}
                                valueQty={quantity}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;