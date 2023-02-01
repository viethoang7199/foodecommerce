import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { AiOutlineCaretDown, AiOutlineSearch, AiOutlineDown } from 'react-icons/ai';
import { FaBars, FaRegEdit, FaSignOutAlt, FaTimes, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../../assets/images/avatar/avatar.png';
import Overlay from '../common/Overlay/Overlay';
import CartPopup from '../UI/Popup/CartPopup/CartPopup';
import SearchPopup from '../UI/Popup/SearchPopup/SearchPopup';
import useAuth from '../../CustomHook/useAuth';
import { GoGraph } from "react-icons/go";

export const navMenus = [
    {
        display: "Home",
        path: "/",
    },
    {
        display: "shop",
        path: "/shop",
    },
    // {
    //     display: "Giỏ hàng",
    //     path: "/cart",
    // },
    // {
    //     display: "Thanh toán",
    //     path: "/checkout",
    // },
    {
        display: "About Us",
        path: "/about",
    },
    {
        display: "Contact",
        path: "/contact",
    },
    {
        display: "Test",
        path: "/test",
    },
]

const Header = ({ onHandleLogout }) => {
    const cartList = useSelector(state => state.cartList.cartItems);
    const [openMenuMobile, setOpenMenuMobile] = useState(false);
    const [openSearchPopup, setOpenSearchPopup] = useState(false);
    const [openCartPopup, setOpenCartPopup] = useState(false);
    const [userList, setUserList] = useState(false);
    const [userMobileNav, setUserMobileNav] = useState(false);

    const { currentUser } = useAuth();

    const { pathname } = useLocation()
    const activeNav = navMenus.findIndex(e => e.path === pathname)

    openMenuMobile || openSearchPopup || openCartPopup ? document.body.style.overflow = "hidden" : document.body.style.overflow = 'auto';

    const overlay = () => {
        setOpenMenuMobile(false)
        setOpenCartPopup(false)
        setOpenSearchPopup(false)
    }

    return (
        <section className='header shadow-2xl fixed top-0 left-0 right-0 z-50 bg-white'>
            <Overlay
                className={`${openMenuMobile || openCartPopup || openSearchPopup ? 'block' : 'hidden'}`}
                onClick={overlay}
            />

            <SearchPopup
                className={`${openSearchPopup ? 'active' : ''}`}
                onHandleCloseSearchPopup={() => setOpenSearchPopup(false)}
            />

            <CartPopup
                className={`${openCartPopup ? 'active' : ''}`}
                onHandleClose={() => setOpenCartPopup(false)}
                onHandleViewCart={() => setOpenCartPopup(false)}
                onHandleCheckout={() => setOpenCartPopup(false)}
                onHandleReturnShop={() => setOpenCartPopup(false)}
            />

            <div className='container flex justify-between items-center px-4 py-5 m-auto lg:px-16 xl:px-4'>
                <div className='lg:hidden mx-2'
                    onClick={() => setOpenMenuMobile(true)}
                >
                    <FaBars className='text-2xl text-white bg-pink w-10 h-10 rounded-xl p-2'
                    />
                </div>

                <div className='text-center lg:text-left text-3xl font-bold grow'>
                    <Link to='/'>LOGO</Link>
                </div>

                <div className={`lg:bg-transparent bg-dark-blue flex lg:justify-center justify-start lg:items-center items-center flex-col lg:flex-row lg:static absolute top-0 left-0 z-50 w-full lg:w-auto md:w-[450px] h-screen lg:h-auto pt-20 lg:pt-0 md:pt-24 px-7 lg:px-0 pb-7 lg:pb-0 -translate-x-full lg:translate-x-0 transition-all duration-500 ease-in-out overflow-auto grow ${openMenuMobile
                    ? 'translate-x-0 transition-all duration-500 ease'
                    : ''}`}>
                    <div className="lg:hidden text-white bg-pink text-xl flex justify-center items-center w-full h-12 md:h-16 absolute top-0 left-0 z-30"
                        onClick={() => setOpenMenuMobile(false)}
                    >
                        <span>Close</span>
                        <FaTimes />
                    </div>

                    <div className="item__search lg:hidden w-full"
                        onClick={() => setOpenMenuMobile(false)}
                    >
                        <h3 className="uppercase text-sm md:text-lg text-white text-center font-semibold mb-3">
                            What are you looking for?
                        </h3>
                        <Link className='rounded-2xl h-10 bg-white w-full mb-5 flex justify-between items-center px-4'
                            onClick={() => setOpenSearchPopup(true)}
                        >
                            <span>Search</span>
                            <AiOutlineSearch />
                        </Link>
                    </div>

                    {navMenus.map((item, index) => (
                        <div
                            key={index}
                            className={`text-white md:text-xl lg:text-base lg:border-none lg:text-black w-full lg:w-auto lg:px-0 lg:py-2 lg:rounded-xl transition-all duration-500 ease border-b border-dashed border-light-gray font-bold capitalize hover:text-orange ${index === activeNav ? '!text-pink' : ''}`}
                            onClick={() => setOpenMenuMobile(false)}
                        >
                            <Link
                                to={item.path}
                                className='flex pt-6 lg:pt-0 pb-1 lg:pb-0 lg:px-4'
                            >
                                <span>{item.display}</span>
                            </Link>
                        </div>
                    ))}

                    <div className='account lg:hidden pt-6 pb-1 w-full text-white text-base md:text-xl mb-5 border-b border-dashed border-light-gray font-bold'
                        onClick={() => setUserMobileNav(!userMobileNav)}
                    >
                        {
                            currentUser
                                ?
                                <div className='flex items-center justify-between relative'>
                                    <div className='flex items-center'>
                                        <img
                                            className='rounded-full cursor-pointer w-10 h-10 object-contain'
                                            src={currentUser && currentUser.photoURL ? currentUser.photoURL : Avatar}
                                            alt="avt"
                                        />
                                        <p className='ml-2'>
                                            <span>Welcome,&nbsp;</span>
                                            <span>{currentUser.displayName}</span>
                                        </p>
                                    </div>

                                    <span><AiOutlineDown /></span>

                                    <div className={`absolute left-0 top-10 bg-white rounded py-3 w-full ${userMobileNav ? 'block' : 'hidden'}`}
                                        onClick={() => setOpenMenuMobile(false)}
                                    >
                                        <Link to='/update-profile' className='flex items-center px-4 py-2 mx-2 rounded-xl text-black'>
                                            <span className='mr-3'><FaRegEdit /></span>
                                            <span>Edit profile</span>
                                        </Link>

                                        <Link to='/cart' className='flex items-center px-4 py-2 mx-2 rounded-xl text-black'>
                                            <span className='mr-3 relative after:content-[attr(quantity)] after:bg-pink after:w-4 after:h-4 after:absolute after:-top-2 after:-right-2 after:rounded-full after:text-white after:text-xs after:flex after:justify-center after:items-center' quantity={cartList.length}>
                                                <HiOutlineShoppingBag />
                                            </span>
                                            <span>View cart</span>
                                        </Link>

                                        <p className="flex items-center px-4 !text-black py-2 m-2 rounded-xl bg-slate-300 shadow-md cursor-pointer" onClick={onHandleLogout}>
                                            <span className='mr-3 font-semibold'><FaSignOutAlt /></span>
                                            <span className='font-medium text-lg'>Logout</span>
                                        </p>
                                    </div>

                                </div>
                                :
                                <Link
                                    to='/login'
                                    className='flex justify-start items-center text-white'
                                >
                                    <FiUsers />
                                    <span className='ml-3'>Login / Register</span>
                                </Link>
                        }
                    </div>
                </div>

                <ul className='header__icon flex justify-end items-center grow-0 lg:grow'>
                    {/* <li className='mr-1.5 hidden xl:block'>
                        <div
                            className='border-none p-0 w-10 h-10 flex justify-center cursor-pointer items-center rounded-full bg-cream hover:!bg-pink hover:!text-white active:!text-white active:!border-pink'
                            onClick={() => setOpenSearchPopup(true)}
                        >
                            <AiOutlineSearch className='text-2xl' />
                        </div>
                    </li> */}

                    <li className='mx-1.5 relative after:content-[attr(quantity)] after:bg-pink after:w-6 after:h-6 after:absolute after:-top-2 after:-right-2 after:rounded-full after:text-white after:flex after:justify-center after:items-center'
                        quantity={cartList.length}
                    >
                        <div
                            className='border-none p-0 w-10 h-10 flex justify-center cursor-pointer items-center rounded-full bg-cream hover:!bg-pink hover:!text-white'
                            onClick={() => setOpenCartPopup(true)}
                        >
                            <HiOutlineShoppingBag className='text-2xl' />
                        </div>
                    </li>

                    <li
                        className='hidden lg:block relative mx-1.5 w-10 h-10'
                        onClick={() => setUserList(!userList)}>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            className='rounded-full cursor-pointer'
                            src={currentUser && currentUser.photoURL ? currentUser.photoURL : Avatar}
                            alt="avt"
                        />
                        <AiOutlineCaretDown className='absolute top-1/4 -right-5 cursor-pointer' />

                        <div className={`min-w-max w-[200px] absolute rounded-xl border border-dark-gray bg-white drop-shadow-2xl shadow-xl -right-6 top-12 ${userList ? 'block' : 'hidden'}`}>
                            {currentUser ?
                                <>
                                    <p className='flex items-center !text-black px-4 py-2 m-2 rounded-xl bg-slate-300 drop-shadow-xl cursor-default'>
                                        <span className='font-semibold text-lg'>Welcome, &nbsp;</span>
                                        <span className='font-semibold text-lg'>{currentUser.displayName}</span>
                                    </p>
                                    <hr />
                                    {currentUser.email === 'admin@gmail.com' ?
                                        <Link
                                            to='/admin'
                                            className='flex items-center px-4 py-2 mx-2 rounded-xl hover:bg-red-100 hover:font-medium transition-colors duration-300 ease'>
                                            <span className='mr-3'><GoGraph /></span>
                                            <span>Dashboard</span>
                                        </Link>
                                        : ''
                                    }
                                    <Link to='/update-profile' className='flex items-center px-4 py-2 mx-2 rounded-xl hover:bg-red-100 hover:font-medium transition-colors duration-300 ease'>
                                        <span className='mr-3'><FaRegEdit /></span>
                                        <span>Edit profile</span>
                                    </Link>
                                    <Link to='/cart' className='flex items-center px-4 py-2 mx-2 rounded-xl hover:bg-red-100 hover:font-medium transition-colors duration-300 ease'>
                                        <span className='mr-3 relative after:content-[attr(quantity)] after:bg-pink after:w-4 after:h-4 after:absolute after:-top-2 after:-right-2 after:rounded-full after:text-white after:text-xs after:flex after:justify-center after:items-center' quantity={cartList.length}>
                                            <HiOutlineShoppingBag />
                                        </span>
                                        <span>View cart</span>
                                    </Link>
                                    <hr />
                                    <p className="flex items-center px-4 !text-black py-2 m-2 rounded-xl bg-slate-300 shadow-md cursor-pointer" onClick={onHandleLogout}>
                                        <span className='mr-3 font-semibold'><FaSignOutAlt /></span>
                                        <span className='font-medium text-lg'>Logout</span>
                                    </p>
                                </>
                                :
                                <>
                                    <Link
                                        to='/login'
                                        className='text-lg font-medium px-4 py-2 hover:bg-pink hover:text-white cursor-pointer rounded-lg flex items-center'
                                        onClick={() => setUserList(false)}
                                    >
                                        <span className='mr-3'><FaSignInAlt /></span>
                                        <span className='grow'>Login</span>
                                    </Link>
                                    <Link
                                        to='/signup'
                                        className='text-lg font-medium px-4 py-2 hover:bg-pink hover:text-white cursor-pointer rounded-lg flex items-center'
                                        onClick={() => setUserList(false)}
                                    >
                                        <span className='mr-3'><FaUserPlus /></span>
                                        <span className='grow'>Sign Up</span>
                                    </Link>
                                </>}

                        </div>
                    </li>

                </ul>
            </div>
        </section>
    );
};

export default Header;