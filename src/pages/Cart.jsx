import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackToTop from '../components/common/BackToTop/BackToTop';
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb';
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon';
import Quantity from '../components/common/Quantity/Quantity';
import Helmet from '../components/UI/Helmet';
import { cartSlice } from '../store/Slice/cartSlice';

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
        dispatch(cartSlice.actions.REMOVE_ITEM(cartItemId));
        setLoading(false)
        toast.success('The product has been removed from the cart');
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
                    <div className="flex justify-between flex-col lg:flex-row">
                        <div className="py-14 lg:py-20 px-4 lg:px-0 lg:pr-10 w-full">
                            <table className='cart__page__table w-full border-separate md:border-collapse md:border md:border-gray-200 m-auto rounded-xl'>
                                <thead className='bg-gray-100 hidden md:table-header-group'>
                                    <tr>
                                        <th className='px-2 py-3 font-bold'>Image</th>
                                        <th className='px-2 py-3 font-bold'>Product Name</th>
                                        <th className='px-2 py-3 font-bold'>Price</th>
                                        <th className='px-2 py-3 font-bold'>Quantity</th>
                                        <th className='px-2 py-3 font-bold'>Total</th>
                                        <th className='px-2 py-3 font-bold'>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartList.map((cart, index) => (
                                        <tr
                                            key={index}
                                            className='cart__page__table__item block md:table-row border border-gray-400 my-5 mx-0'
                                        >
                                            <td
                                                data-title='Product'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] after:absolute after:left-4 after:top-2/4 after:block md:after:hidden after:font-semibold after:-translate-y-2/4'
                                            >
                                                <img className='cart__page__table__item-img w-20 h-20 object-cover mx-auto inline-block' src={cart.photoURL} alt='' />
                                            </td>
                                            <td data-title='Name'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4'
                                            >
                                                {cart.productName}
                                            </td>
                                            <td
                                                data-title='Price'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4'
                                            >
                                                {cart.discounted ? <>
                                                    <span className="font-bold text-pink mr-2">
                                                        ${cart.discounted}
                                                    </span>
                                                    <span className="text-dark-gray font-bold line-through">
                                                        ${cart.price}
                                                    </span>
                                                </>
                                                    : <span className="font-bold text-pink">
                                                        ${cart.price}
                                                    </span>
                                                }
                                            </td>
                                            <td data-title='Quantity'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4'
                                            >
                                                <div className='cart__page__table__item-qty'>
                                                    <Quantity
                                                        onHandleDecreaseQty={() => decreaseItem(cart.id)}
                                                        onHandleIncreaseQty={() => increaseItem(cart)}
                                                        valueQty={cart.quantity}
                                                    />
                                                </div>
                                            </td>
                                            <td data-title='Total'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4'
                                            >
                                                <span className='font-semibold text-pink'>
                                                    ${cart.totalPrice}
                                                </span>
                                            </td>
                                            <td data-title='Remove'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4'
                                            >
                                                <div
                                                    className='cursor-pointer'
                                                >
                                                    <ButtonCommon
                                                        className='!p-2'
                                                        name={<FaTrashAlt className='text-sm' />}
                                                        loading={loading}
                                                        onClick={() => removeCartItem(cart.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className='flex justify-center md:table-row border border-gray-400 md:border-gray-200 my-5 mx-0'>
                                        <td colSpan={6} className='cart__page__table__item-action py-4 md:py-5 px-4 md:px-0'>
                                            <div className='flex justify-end items-center flex-col md:flex-row w-full'>
                                                <ButtonCommon
                                                    name='Delete all products in cart'
                                                    onClick={deleteAllItems}
                                                />
                                                <Link to='/shop' className='action-btn mx-4 mt-5 md:mt-0 text-center w-full md:w-auto'>
                                                    <ButtonCommon name='Continue order' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border-2 border-gray-300 border-solid rounded-2xl mx-4 md:mx-0 mb-10 lg:mb-0 md:w-6/12 lg:w-4/12 h-full lg:my-20'>
                            <div className="p-6">
                                <h4 className='text-xl font-semibold mb-4'>Cart totals</h4>
                                <div className='py-4 border-t border-light-gray border-solid text-dark-blue font-medium flex justify-between items-center'>
                                    <span>Subtotal</span>
                                    <span className='text-pink font-semibold'>${totalAmount}</span>
                                </div>
                                <div className='py-4 border-t border-light-gray border-solid text-dark-blue font-medium flex justify-between items-center'>
                                    <span>Shipping cost</span>
                                    <span className='text-pink font-semibold'>$2.00</span>
                                </div>
                                <div className='py-4 border-t border-light-gray border-solid text-dark-blue font-medium flex justify-between items-center'>
                                    <span>Total</span>
                                    <span className='text-pink font-semibold'>${totalAmount + 2.00}</span>
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