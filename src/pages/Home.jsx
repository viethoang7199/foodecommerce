import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BacktoTop from '../components/common/BackToTop/BackToTop';
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon';
import SectionSubtitle from '../components/common/SectionSubtitle/SectionSubtitle';
import SectionTitle from '../components/common/SectionTitle/SectionTitle';
import Commit from '../components/UI/Commit';
import Feedback from '../components/UI/Feedback';
import Hero from '../components/UI/Hero';
import Menu from '../components/UI/Menu';
import ProductListSlide from '../components/UI/ProductListSlide';


import about_img_01 from '../assets/images/about/about-thumbnail-1.png';
import about_img_02 from '../assets/images/about/about-thumbnail-2.png';
import about_img_03 from '../assets/images/about/about-thumbnail-3.png';
import about_img_04 from '../assets/images/about/about-thumbnail-4.png';
import about_img_05 from '../assets/images/about/about-thumbnail-5.png';

import { BsDroplet } from "react-icons/bs";
import { GiKnifeFork, GiReceiveMoney } from "react-icons/gi";

import useGetData from '../CustomHook/useGetData';
import Helmet from '../components/UI/Helmet'


const Home = () => {

    const { data: products } = useGetData('products')

    // useEffect(() => {
    //     window.scroll(0, 0)
    // }, []);

    return <Helmet title='Home'>
        <section className='main__content overflow-x-hidden'>
            <div className='section__backtotop'>
                <BacktoTop />
            </div>
            <div className='section__hero'>
                <Hero />
            </div>
            <div className='section__menu'>
                <Menu />
            </div>

            <div className='about py-20'>
                <div className="container mx-auto xl:px-32">
                    <div className="lg:grid grid-cols-3">
                        <div className='col-span-2 px-4'>
                            <div className='grid grid-cols-3 gap-5 lg:gap-5'>
                                <div className='col-span-2 flex flex-col gap-5 grow'>
                                    <img className='w-full h-[180px] lg:h-[330px] object-cover rounded-xl' src={about_img_01} alt="about-thumbnail" />
                                    <div className='flex justify-between gap-5'>
                                        <img className='grow w-full h-[128px] lg:h-[230px] object-cover rounded-xl' src={about_img_04} alt="about-thumbnail" />
                                        <img className='w-[46px] xl:w-[84px] h-[128px] lg:h-[230px] object-cover rounded-xl' src={about_img_03} alt="about-thumbnail" />
                                    </div>
                                </div>
                                <div className='col-span-1 flex justify-center flex-col gap-3 md:gap-5'>
                                    <img className='w-full h-[120px] lg:h-[210px] object-cover rounded-xl' src={about_img_05} alt="about-thumbnail" />
                                    <img className='w-full h-[120px] lg:h-[210px] object-cover rounded-xl' src={about_img_02} alt="about-thumbnail" />

                                    <div className='flex items-center gap-1 md:gap-5'>
                                        <p className='text-3xl md:text-5xl font-black text-pink'>20</p>
                                        <p className='flex flex-col'>
                                            <span className='uppercase text-gray-600 text-xs md:text-base font-medium'>Years of</span>
                                            <span className='uppercase text-dark-blue text-sm md:text-xl font-bold'>Experience</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='pt-10 px-4'>
                            <div className='mb-5'>
                                <p className='font-lobster text-xl mb-2 text-pink'>About Us</p>
                                <h4 className='text-[40px] text-dark-blue leading-tight font-extrabold mb-7'>We Always Provide Quality Fast Foods For You</h4>
                                <p className='text-gray-600'>Seamlessly conceptualize sticky functionalities after prospective data. Interactively unleash customized supply chains whereas goal oriented paradigm.</p>
                            </div>

                            <div className='flex items-center justify-between mb-7'>
                                <div>
                                    <GiKnifeFork className='text-6xl font-bold text-pink border border-pink rounded-full p-2 mx-auto mb-1' />
                                    <p className='uppercase font-semibold'>Delicious</p>
                                </div>
                                <div>
                                    <BsDroplet className='text-6xl font-bold text-pink border border-pink rounded-full p-2 mx-auto mb-1' />
                                    <p className='uppercase font-semibold'>Fresh</p>
                                </div>
                                <div>
                                    <GiReceiveMoney className='text-6xl font-bold text-pink border border-pink rounded-full p-2 mx-auto mb-1' />
                                    <p className='uppercase font-semibold'>Best price</p>
                                </div>
                            </div>
                            <hr />
                            <Link to='/about' className='mt-5 block'>
                                <ButtonCommon name='About more' className='!py-3 px-8 rounded-full' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section__popular_product py-10 sm:py-16 px-4 bg-background'>
                <div className="container m-auto">
                    <div className='pb-2'>
                        <SectionSubtitle name='- Popular menu -' />
                        <SectionTitle name={<span>Our popular delicious <span className='text-pink font-lobster font-normal'>foods</span></span>} />
                        <p className='relative text-center !text-black m-auto w-[300px] sm:w-[600px]'>
                            Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.
                        </p>
                    </div>
                    <div className='tab__product'>
                        <ProductListSlide data={products} />
                        <div className='w-52 mt-5 mx-auto'>
                            <Link to='/shop'>
                                <ButtonCommon name='See more products' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section__commit py-16 px-4 h-full'>
                <SectionSubtitle name='- Highest Quality -' />
                <SectionTitle name='What makes us different' />
                <Commit />
            </div>

            <div className='section__feedback py-16 px-4 h-full bg-background'>
                <SectionSubtitle name='- Testimonials -' />
                <SectionTitle name={<span>Our customer <span className='text-pink font-lobster font-normal'>feedbacks</span></span>} />
                <p className='!text-black relative text-center m-auto w-[300px] sm:w-[600px]'>
                    Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.
                </p>
                <Feedback />
            </div>
        </section>
    </Helmet>
};

export default Home;