import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb'
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon'
import Helmet from '../components/common/Helmet/Helmet'
import InputText from '../components/common/InputText/InputText'
import InputTextArea from '../components/common/InputTextArea/InputTextArea'

const Test = () => {
    return <Helmet title='Contact'>
        <BreadCrumb title={<><span>Contact</span> <span className='text-orange'>Us</span></>} />
        <div className="relative bg-background py-20">
            <img
                className="lg:h-full md:h-full w-full md:w-1/2 absolute object-cover inset-0 object-center md:block hidden"
                src="https://cdn.tuk.dev/assets/templates/radian/Back_Image.png"
                alt="map" />
            <div className="mx-auto container relative">
                <div className="flex items-center flex-col md:flex-row px-4 md:px-12 lg:px-0">
                    <div className="w-full relative xl:mt-10 mb-10 xl:pr-24 xl:pl-12 pl-0 ">
                        <div className="w-full flex flex-col items-start xl:justify-start relative z-20 xl:py-0 py-4">
                            <div className="w-full xl:pl-32">
                                <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider ">We're Here</h3>
                                <div className="w-full md:w-10/12 mt-3">
                                    <p className="text-base md:text-lg leading-8 !text-black tracking-wider">We believe digital innovation is at the heart of every business success</p>
                                    <div className="mt-4 md:mt-8">
                                        <h4 className="text-xl font-semibold">Address</h4>
                                        <h4 className="text-lg leading-8 tracking-wider mt-2">Đắk Lắk</h4>
                                    </div>
                                    <div className="mt-4 md:mt-8">
                                        <h4 className="text-xl font-semibold">Contact</h4>
                                        <h4 className="text-lg leading-8 tracking-wider mt-2">123456789</h4>
                                    </div>
                                    <div className="mt-4 md:mt-8 mb-10 md:mb-0">
                                        <h4 className="text-xl font-semibold">Email</h4>
                                        <h4 className="text-lg leading-8 tracking-wider mt-2">support@example.com</h4>
                                    </div>
                                    <hr className="md:hidden" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:pl-24 md:ml-20 lg:ml-0">
                        <div className="mb-10">
                            <h3 className="text-4xl md:text-5xl lg:text-7xl text-pink font-bold tracking-wider">Let's Talk</h3>
                            <h3 className="text-black text-lg leading-8 tracking-wider">For enquiries, please email us using the form below</h3>
                        </div>
                        <form className="w-full">
                            <div className="lg:grid grid-cols-2 gap-10 mb-5">
                                <InputText
                                    type='text'
                                    className='w-full mb-5 bg-background shadow-lg border border-slate-400 border-solid rounded-2xl px-4 py-2'
                                    placeholder='Your name'
                                    name='name'
                                />
                                <InputText
                                    type='text'
                                    className='w-full mb-5 bg-background shadow-lg border border-slate-400 border-solid rounded-2xl px-4 py-2'
                                    placeholder='Your Email'
                                    name='email'
                                />
                            </div>
                            <InputTextArea
                                className='w-full mb-5 bg-background shadow-lg border border-slate-400 border-solid rounded-2xl px-4 py-2'
                                placeholder='Your message'
                                name='message'
                            />
                            <div className="text-center">
                                <ButtonCommon name='Send message' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Helmet>
}

export default Test