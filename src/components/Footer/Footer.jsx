import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <div className='footer bg-background pt-20 pb-16 px-4'>
            <div className='container m-auto'>
                <div className='flex justify-between flex-wrap'>
                    <div className='footer__item w-1/4 p-4 grow'>
                        <h3 className='text-white text-xl uppercase font-bold mb-8'>Let us help you</h3>
                        <p className='mb-7 text-dark-gray'>If you have any question, please
                            contact us at: support@example.com</p>
                        <p className='text-lg mb-3 text-dark-gray'>Social media: </p>
                        <div className='footer__item__social'>
                            <ul className='items-center inline-flex'>
                                <li className='footer__item__social-fb text-black bg-white w-6 h-6 flex justify-center items-center rounded-full'><FaFacebookF /></li>
                                <li className='footer__item__social-fb text-black bg-white w-6 h-6 flex justify-center items-center rounded-full mx-4'><FaTwitter /></li>
                                <li className='footer__item__social-fb text-black bg-white w-6 h-6 flex justify-center items-center rounded-full'><FaInstagram /></li>
                            </ul>
                        </div>
                    </div>
                    <div className='footer__item w-1/4 p-4 pl-12 grow'>
                        <h3 className='text-white text-xl uppercase font-bold mb-8'>Looking for Tên shop</h3>
                        <div className='footer__item__address'>
                            <p className='text-dark-gray'>Đắk Lắk</p>
                            <p className='mb-5 text-dark-gray'>Việt Nam</p>
                        </div>
                        <div className='footer__item__time'>
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
                    <div className='footer__item w-1/4 p-4 pl-12 grow'>
                        <h3 className='footer__item__categories text-white text-xl uppercase font-bold mb-8'>Categories</h3>
                        <ul>
                            <li className='footer__item__categories-item mb-3 text-dark-gray '>
                                <Link className='inline-block'>Pizza</Link>
                            </li>
                            <li className='footer__item__categories-item mb-3 text-dark-gray '>
                                <Link className='inline-block'>Hamburger</Link>
                            </li>
                            <li className='footer__item__categories-item mb-3 text-dark-gray '>
                                <Link className='inline-block'>Pasta</Link>
                            </li>
                            <li className='footer__item__categories-item text-dark-gray'>
                                <Link className='inline-block'>Salad</Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className='footer__item w-1/4 p-4'>
                        <h3 className='footer__item__categories text-white text-xl uppercase font-bold mb-8'>Chưa biết để gì</h3>
                        <p className='text-light-gray'>Chưa biết để gì</p>
                    </div> */}
                </div>
            </div>

        </div>
    );
};

export default Footer;