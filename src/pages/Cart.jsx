import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BackToTop from '../components/common/BackToTop/BackToTop';
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb';
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon';
import Quantity from '../components/common/Quantity/Quantity';
import { cartSlice } from '../store/Slice/cartSlice';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import Helmet from '../components/UI/Helmet'

const Cart = () => {
    const cartList = useSelector(state => state.cartList.cartItems);
    const totalAmount = useSelector(state => state.cartList.totalAmount);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const increaseItem = (cart) => {
        dispatch(
            cartSlice.actions.ADD_ITEM(cart)
        );
    };

    const decreaseItem = (cartItemId) => {
        dispatch(cartSlice.actions.DECREASE(cartItemId));
    };

    const removeCartItem = (cartItemId) => {
        setLoading(true);
        setTimeout(() => {
            dispatch(cartSlice.actions.REMOVE_ITEM(cartItemId));
            setLoading(false)
            toast.success('The product has been removed from the cart');
        }, 1000)
    }

    const deleteAllItems = () => {
        setLoading(true);
        setTimeout(() => {
            dispatch(cartSlice.actions.DELETE_ALL_ITEM());
            setLoading(false)
            toast.success('The product has been removed from the cart');
        }, 1000)
    }

    useEffect(() => {
        window.scroll(0, 0)
    })

    return <Helmet title='Cart'>
        <div className='cart__page' >
            <BackToTop />
            <BreadCrumb />
            {cartList.length > 0 ?
                <div className="container m-auto">
                    <div className="flex justify-between">
                        <div className="py-20 pr-10 w-full">
                            <table className='cart__page__table m-auto rounded-xl'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartList.map((cart, index) => (
                                        <tr className='cart__page__table__item' key={index}>
                                            <td data-title='Product'>
                                                <img className='cart__page__table__item-img' src={cart.image} alt='' />
                                            </td>
                                            <td data-title='Name' className='text-lg font-medium'>{cart.productName}</td>
                                            {/* <td data-title='Price'>${cart.price}</td> */}
                                            <td>
                                                {cart.discounted ? <>
                                                    <span className="font-bold text-pink mr-2">
                                                        {cart.discounted}
                                                    </span>
                                                    <span className="text-dark-gray font-bold line-through">
                                                        {cart.price}
                                                    </span>
                                                </>
                                                    : <span className="font-bold text-pink">
                                                        {cart.price}
                                                    </span>
                                                }
                                            </td>
                                            <td data-title='Quantity'>
                                                <div className='cart__page__table__item-qty'>
                                                    <Quantity
                                                        onHandleDecreaseQty={() => decreaseItem(cart.id)}
                                                        onHandleIncreaseQty={() => increaseItem(cart)}
                                                        valueQty={cart.quantity}
                                                    />
                                                </div>
                                            </td>
                                            <td data-title='Total' className='font-medium'>
                                                {cart.totalPrice}
                                            </td>
                                            <td data-title='Remove'>
                                                <motion.div
                                                    whileTap={{ scale: 0.6 }}
                                                    className='cursor-pointer'
                                                >
                                                    <ButtonCommon
                                                        className='!p-2'
                                                        name={<FaTrashAlt className='text-sm' />}
                                                        loading={loading}
                                                        onClick={() => removeCartItem(cart.id)}
                                                    />
                                                </motion.div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={6} className='cart__page__table__item-action'>
                                            <div className='flex justify-end items-center w-full'>
                                                <ButtonCommon
                                                    name='Delete all products in cart'
                                                    onClick={deleteAllItems}
                                                />
                                                <Link to='/shop' className='action-btn mx-4'>
                                                    <ButtonCommon name='Continue order' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border-2 border-pink border-solid rounded-2xl w-4/12 h-full my-20'>
                            <div className="p-6">
                                <h4 className='text-xl font-semibold mb-4'>Cart totals</h4>
                                <div className='py-4 border-t border-light-gray border-solid text-dark-blue font-medium flex justify-between items-center'>
                                    <span>Subtotal</span>
                                    <span>${totalAmount}</span>
                                </div>
                                <div className='py-4 border-t border-light-gray border-solid text-dark-blue font-medium flex justify-between items-center'>
                                    <span>Shipping cost</span>
                                    <span>$2.00</span>
                                </div>
                                <div className='py-4 border-t border-light-gray border-solid text-dark-blue font-medium flex justify-between items-center'>
                                    <span>Total</span>
                                    <span>${totalAmount + 2.00}</span>
                                </div>
                                <p className='text-sm py-4 border-t border-light-gray border-solid text-dark-gray'>Taxes and shipping calculated at checkout</p>
                                <Link to='/checkout'>
                                    <ButtonCommon
                                        name='Checkout'
                                        className='w-full'
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="container mx-auto">
                    <div className='w-96 mx-auto pt-20 pb-80'>
                        <p className='text-3xl text-center mb-5'>Your cart is empty.</p>
                        <Link to='/shop' className='w-52 mx-auto block'>
                            <ButtonCommon name='Return to shop' />
                        </Link>
                    </div>
                </div>
            }
        </div>
    </Helmet>
};

export default Cart;