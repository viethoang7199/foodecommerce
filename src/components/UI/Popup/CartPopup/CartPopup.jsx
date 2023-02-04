import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { RiShoppingBasket2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonCommon from '../../../common/ButtonCommon/ButtonCommon';
import CartItemPopup from './CartItemPopup';


const CartPopup = ({ onHandleClose, className, onHandleViewCart, onHandleCheckout, onHandleReturnShop }) => {

    const cartList = useSelector(state => state.cartList.cartItems)
    const totalAmount = useSelector(state => state.cartList.totalAmount);

    return (
        <div className={`cartpopup bg-white fixed top-0 right-0 z-50 md:w-96 w-full h-full shadow-2xl translate-x-full transition-all duration-500 ease-in-out overflow-hidden ${className}`}>
            <div className='flex justify-between items-center p-5 bg-dark-blue'>
                <span className='uppercase font-bold text-xl text-white'>Order cart</span>
                <FaTimes
                    onClick={onHandleClose}
                    className='text-2xl text-white cursor-pointer hover:text-pink active:text-dark-pink'
                />
            </div>
            <div className='cartpopup__center p-4 overflow-auto h-[calc(100%-17rem)] md:h-[calc(100%-20rem)]'>
                {cartList.length > 0
                    ?
                    cartList.map((cart, index) => (
                        <CartItemPopup
                            key={index}
                            cartItem={cart}
                        />
                    ))
                    :
                    <div>
                        <div className='mt-10'>
                            <div className='relative'>
                                <FaTimes
                                    className='text-3xl text-light-gray absolute -top-2 left-2/4 -translate-x-2/4'
                                />
                                <RiShoppingBasket2Line
                                    className='text-9xl text-light-gray mx-auto'
                                />
                            </div>
                            <p className='font bold text-3xl !text-black text-center'>Your cart is empty</p>
                        </div>
                        <div className='mx-auto mt-10 w-44'>
                            <Link to='/shop'>
                                <ButtonCommon
                                    name='Return to shop'
                                    className='rounded-3xl'
                                    onClick={onHandleReturnShop}
                                />
                            </Link>
                        </div>
                    </div>
                }
            </div>

            {cartList.length > 0 ?
                <div className='px-8 py-4 h-56'>
                    <div className='p-4 flex justify-between items-center  border-t border-solid border-slate-700'>
                        <span className='uppercase font-bold'>Total</span>
                        <span className='text-pink font-semibold'>${totalAmount}</span>
                    </div>
                    <div>
                        <div className="mb-2 ">
                            <Link to='/cart' onClick={onHandleViewCart}><ButtonCommon name='View cart' className='w-full' /></Link>
                        </div>
                        <div >
                            <Link to='/checkout' onClick={onHandleCheckout}><ButtonCommon name='Check out' className='w-full' /></Link>
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    );
};

export default CartPopup;