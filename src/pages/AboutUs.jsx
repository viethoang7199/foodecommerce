import React, { useEffect } from 'react';
import { GiHamburger } from "react-icons/gi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineRoomService } from "react-icons/md";
import { TbDiscount2 } from "react-icons/tb";
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb';

import about_img_01 from '../assets/images/about/inpage/about_1_1.png';
import about_img_02 from '../assets/images/about/inpage/about_1_2.png';
import about_img_03 from '../assets/images/about/inpage/about_2_1.png';
import about_img_shape_01 from '../assets/images/about/inpage/shape/bg_shape_1.png';
import about_img_shape_02 from '../assets/images/about/inpage/shape/bg_shape_2.png'
import about_img_icon01 from '../assets/images/about/icons/strength/burger.png'
import about_img_icon02 from '../assets/images/about/icons/strength/healthy.png'
import about_img_icon03 from '../assets/images/about/icons/strength/hygienic.png'

import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon';
import SectionSubtitle from '../components/common/SectionSubtitle/SectionSubtitle';
import SectionTitle from '../components/common/SectionTitle/SectionTitle';

import Feedback from '../components/UI/Feedback'
import Helmet from '../components/UI/Helmet'
import BackToTop from '../components/common/BackToTop/BackToTop';

const AboutUs = () => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return <Helmet title='About'>
        <BackToTop />
        <div className='about mt-20'>
            <BreadCrumb title={<><span>About</span> <span className='text-orange'>Us</span></>} />
            <div className='xl:container xl:mx-auto lg:px-8 xl:px-0'>
                <div className="md:flex py-20 lg:border-l-2 lg:border-b-2 lg:rounded-bl-[50px] lg:border-dashed lg:border-black">
                    <div className='flex flex-col items-center lg:flex-row pl-6 lg:border-r lg:border-dashed lg:border-gray-400'>
                        <div className='bg-stone-200 p-3 lg:py-0 lg:px-4 xl:py-2 rounded-full'>
                            <TbDiscount2 className='text-5xl lg:text-7xl text-pink' />
                        </div>
                        <div className='px-5 md:px-0 lg:px-5 xl:px-10 py-4 lg:py-0 text-center lg:text-left'>
                            <h5 className='font-semibold text-xl'>Discount voucher</h5>
                            <p className='text-base text-gray-600'>Competently orchestrate integrated schema for quickly create.</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center lg:flex-row mt-10 md:mt-0 pl-6 lg:border-r lg:border-dashed lg:border-gray-400'>
                        <div className='bg-stone-200 p-3 lg:py-0 lg:px-4 xl:py-2 rounded-full'>
                            <GiHamburger className='text-5xl lg:text-7xl text-pink' />
                        </div>
                        <div className='px-5 md:px-0 lg:px-5 xl:px-10 py-4 lg:py-0 text-center lg:text-left'>
                            <h5 className='font-semibold text-xl'>Fresh healthy foods</h5>
                            <p className='text-base text-gray-600'>Quantimanes orchestrate integrated schema for quickly Taken.</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center lg:flex-row mt-10 md:mt-0 pl-6'>
                        <div className='bg-stone-200 p-3 lg:py-0 lg:px-4 xl:py-2 rounded-full'>
                            <MdOutlineRoomService className='text-5xl lg:text-7xl text-pink' />
                        </div>
                        <div className='px-5 md:px-0 lg:px-5 xl:px-10 py-4 lg:py-0 text-center lg:text-left'>
                            <h5 className='font-semibold text-xl'>Fast serve on table</h5>
                            <p className='text-base text-gray-600'>Mansikatils orchestrate integrated schema for quickly Harbest.</p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center flex-col lg:flex-row px-4 md:px-12 lg:px-0 lg:py-20 lg:border-r-2 lg:border-dashed lg:border-black'>
                    <div className='lg:w-3/5 relative'>
                        <img
                            className='mx-auto'
                            src={about_img_01}
                            alt=""
                        />
                        <img
                            className='absolute top-0 -left-56 -z-10 hidden md:block'
                            src={about_img_shape_01}
                            alt=""
                        />
                    </div>

                    <div className='lg:w-2/4 xl:pr-40 mt-9 lg:mt-0'>
                        <div className='mb-5'>
                            <p className='font-lobster text-xl mb-2 text-pink'>About Us</p>
                            <h4 className='text-[28px] md:text-[32px] lg:text-[40px] text-dark-blue leading-tight font-extrabold mb-7'>Real Delicious Food Straight To <span className='font-lobster text-pink font-medium'>Your Table</span></h4>
                            <p className='text-gray-600'>Assertively envisioneer high-payoff architectures after interactive service. Collaboratively whiteboard pandemic intellectual capital without cross-platform channels.</p>
                        </div>

                        <div className='flex flex-wrap gap-5 mb-5'>
                            <img className='rounded-2xl ' src={about_img_02} alt="" />

                            <div>
                                <p className='flex items-center gap-2 mb-2'>
                                    <span><IoIosCheckmarkCircle className='text-xl text-pink' /></span>
                                    <span className='text-lg font-medium text-dark-blue'>Delicious & Healthy Foods</span>
                                </p>
                                <p className='flex items-center gap-2 mb-2'>
                                    <span><IoIosCheckmarkCircle className='text-xl text-pink' /></span>
                                    <span className='text-lg font-medium text-dark-blue'>Spacific Family & Kids Zone</span>
                                </p>
                                <p className='flex items-center gap-2 mb-2'>
                                    <span><IoIosCheckmarkCircle className='text-xl text-pink' /></span>
                                    <span className='text-lg font-medium text-dark-blue'>Best Price & Offers</span>
                                </p>
                                <p className='flex items-center gap-2 mb-2'>
                                    <span><IoIosCheckmarkCircle className='text-xl text-pink' /></span>
                                    <span className='text-lg font-medium text-dark-blue'>Made By Fresh Ingredients</span>
                                </p>
                                <p className='flex items-center gap-2'>
                                    <span><IoIosCheckmarkCircle className='text-xl text-pink' /></span>
                                    <span className='text-lg font-medium text-dark-blue'>Music & Other Facilities</span>
                                </p>
                            </div>
                        </div>

                        <hr />

                        <div className='mt-5'>
                            <ButtonCommon name='Discover' className='px-20 rounded-full' />
                        </div>
                    </div>
                </div>

                <div className='py-20 flex flex-col-reverse lg:flex-row items-center px-4 md:px-12 lg:px-0 lg:border-l-2 lg:border-t-2 lg:rounded-tl-[50px] lg:border-dashed lg:border-black'>
                    <div className='lg:w-2/4 lg:pl-24 xl:pl-40 lg:pr-20 px-4'>
                        <div className='mt-16 lg:mt-0 lg:mb-5'>
                            <p className='font-lobster text-xl mb-2 text-pink'>Our Story</p>
                            <h4 className='text-[40px] text-dark-blue leading-tight font-extrabold mb-7'>The Pizzer Has Excellent Of <span className='font-lobster text-pink font-medium'>Quality Foods</span></h4>
                            <p className='text-gray-600 mb-5'>Compellingly supply professional material rather than out-of-the-box process improvements. Phosfluorescently communicate premium mindshare and extensive imperatives. Dynamically fashion.</p>
                            <p className='text-gray-600 mb-5'>Seamlessly conceptualize sticky functionalities after prospective data. Interactively unleash customized supply chains whereas goal oriented paradigm. Credibly reintermediate client-focused model for.</p>
                        </div>
                        <hr />
                        <div className='mt-5 flex items-center gap-10'>
                            <ButtonCommon name='Discover' className='px-20 rounded-full' />
                            <div className='flex items-center gap-2'>
                                <p className='text-5xl font-black text-pink'>20</p>
                                <p className='flex flex-col'>
                                    <span className='uppercase text-gray-600 text-base font-medium'>Years of</span>
                                    <span className='uppercase text-dark-blue text-xl font-bold'>Experience</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='relative grow'>
                        <img src={about_img_03} alt="" />
                        <img
                            className='absolute -top-10 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-cover -z-10 '
                            src={about_img_shape_02}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <section className='our-strength bg-dark-blue pt-20 pb-32'>
                <div className="xl:container xl:mx-auto px-4 md:px-12 lg:px-8">
                    <SectionSubtitle name='Our Strength' />
                    <SectionTitle name={<span>Our Most Loved <span className='font-lobster text-pink font-normal'>Foods</span></span>} className='text-white' />
                    <p className='relative text-center !text-white m-auto w-[300px] sm:w-[600px]'>
                        Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.
                    </p>

                    <div className="xl:w-3/4 mx-auto">
                        <div className='flex flex-col md:flex-row items-center mt-10'>
                            <div className='text-center md:pr-10 md:border-r md:border-dashed md:border-white'>
                                <img className='w-[120px] h-full object-cover mx-auto mb-5' src={about_img_icon01} alt="" />
                                <h3 className='text-white text-2xl font-bold capitalize mb-2'>Fast foods</h3>
                                <p className='text-white'>Professionally fabricate e-business vortals and impactful core competencie. Compellingly impact technically sound</p>
                            </div>
                            <div className='text-center md:px-10 mt-10 md:mt-0 md:border-r md:border-dashed md:border-white'>
                                <img className='w-[120px] h-[120px] object-cover mx-auto mb-5' src={about_img_icon02} alt="" />
                                <h3 className='text-white text-2xl font-bold capitalize mb-2'>Healthy foods</h3>
                                <p className='text-white'>Professionally fabricate e-business vortals and impactful core competencie. Compellingly impact technically sound</p>
                            </div>
                            <div className='text-center md:pl-10 mt-10 md:mt-0'>
                                <img className='w-[120px] h-[120px] object-cover mx-auto mb-5' src={about_img_icon03} alt="" />
                                <h3 className='text-white text-2xl font-bold capitalize mb-2'>Hygienic foods</h3>
                                <p className='text-white'>Professionally fabricate e-business vortals and impactful core competencie. Compellingly impact technically sound</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-background pt-20 pb-32'>
                <div className='px-4 md:px-12 lg:px-0'>
                    <SectionSubtitle name='Testimonials' />
                    <SectionTitle name={<span>Our customer <span className='font-lobster text-pink font-normal'>Feedbacks</span></span>} />
                    <p className='relative text-center text-black m-auto w-[300px] sm:w-[600px]'>
                        Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.
                    </p>
                    <Feedback />
                </div>
            </section>
        </div>
    </Helmet>
}

export default AboutUs