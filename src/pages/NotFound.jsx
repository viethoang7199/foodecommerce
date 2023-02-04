import React from 'react'
import Helmet from '../components/UI/Helmet';
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb';
import error_img from '../assets/images/404/error_img.png'
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon';
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return <Helmet title='404 - Error'>
        <BreadCrumb title={<span>404 - <span className='text-orange'>Error</span></span>} />
        <div className='py-20 px-4 md:px-8 lg:px-0'>
            <div className='container mx-auto'>
                <div className='pb-10'>
                    <img src={error_img} alt="error_img" className='mx-auto' />
                </div>
                <div className='pb-20 text-center'>
                    <h2 className='text-5xl md:text-7xl font-lobster font-bold mb-4'>Page not found</h2>
                    <p className='font-medium md:font-semibold text-lg md:text-2xl text-gray-600 mb-8'>We're sorry, The page you are looking for on longer exists.</p>
                    <Link to='/'>
                        <ButtonCommon
                            name={
                                <span className='flex items-center gap-3'>
                                    <span><AiOutlineHome /></span>
                                    <span className='font-medium'>back home</span>
                                </span>
                            }
                        />
                    </Link>
                </div>
            </div>
        </div>
    </Helmet>
}

export default NotFound