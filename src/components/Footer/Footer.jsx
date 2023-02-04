import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <section className='footer bg-background bg-cover pt-20 pb-16 px-4'>
            <div className='container m-auto'>
                <div className='flex justify-between flex-wrap'>
                    <div className='w-full md:w-2/4 lg:w-1/4 p-4 grow'>
                        <h3 className='text-white text-xl uppercase font-bold mb-3 lg:mb-8'>Let us help you</h3>
                        <p className='mb-7 text-dark-gray'>If you have any question, please
                            contact us at: support@example.com</p>
                        <p className='text-lg mb-3 text-dark-gray'>Social media: </p>
                        <div>
                            <ul className='items-center inline-flex'>
                                <li className='text-black bg-white w-6 h-6 flex justify-center items-center rounded-full'><FaFacebookF /></li>
                                <li className='text-black bg-white w-6 h-6 flex justify-center items-center rounded-full mx-4'><FaTwitter /></li>
                                <li className='text-black bg-white w-6 h-6 flex justify-center items-center rounded-full'><FaInstagram /></li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-1/4 p-4 md:pl-12 grow'>
                        <h3 className='text-white text-xl uppercase font-bold mb-8'>Looking for Tên shop</h3>
                        <div>
                            <p className='text-dark-gray'>Đắk Lắk</p>
                            <p className='mb-5 text-dark-gray'>Việt Nam</p>
                        </div>
                        <div>
                            <p className='text-dark-gray'>
                                Monday - Friday: &nbsp;
                                <span className='text-white'>8:10 AM - 6:10 PM</span>
                            </p>
                            <p className='text-dark-gray'>
                                Saturday: &nbsp;
                                <span className='text-white'>10:10 AM - 06:10 PM</span>
                            </p>
                            <p className='text-dark-gray'>
                                Sunday: &nbsp;
                                <span className='text-white'>Close</span>
                            </p>
                        </div>
                    </div>
                    <div className='w-1/4 p-4 lg:pl-12 grow'>
                        <h3 className='text-white text-xl uppercase font-bold mb-8'>Categories</h3>
                        <ul>
                            <li className='mb-3 text-dark-gray '>
                                <Link className='inline-block hover:translate-x-5 transition-all duration-500 ease-in-out hover:transition-all hover:duration-500 hover:ease-in-out'>Pizza</Link>
                            </li>
                            <li className='mb-3 text-dark-gray '>
                                <Link className='inline-block hover:translate-x-5 transition-all duration-500 ease-in-out hover:transition-all hover:duration-500 hover:ease-in-out'>Hamburger</Link>
                            </li>
                            <li className='mb-3 text-dark-gray '>
                                <Link className='inline-block hover:translate-x-5 transition-all duration-500 ease-in-out hover:transition-all hover:duration-500 hover:ease-in-out'>Pasta</Link>
                            </li>
                            <li className='text-dark-gray'>
                                <Link className='inline-block hover:translate-x-5 transition-all duration-500 ease-in-out hover:transition-all hover:duration-500 hover:ease-in-out'>Salad</Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className='footer__item w-1/4 p-4'>
                        <h3 className='footer__item__categories text-white text-xl uppercase font-bold mb-8'>Chưa biết để gì</h3>
                        <p className='text-light-gray'>Chưa biết để gì</p>
                    </div> */}
                </div>
            </div>

        </section>
    );
};

export default Footer;