import React, { useEffect, useState } from "react";
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon'
import InputText from '../components/common/InputText/InputText'
import InputTextArea from "../components/common/InputTextArea/InputTextArea";
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb'
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import Loading from "../components/UI/Loading";
import Helmet from '../components/UI/Helmet'

const Contact = () => {

    const [formVal, setFormVal] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChangeFields = (e) => {
        const { name, value } = e.target
        setFormVal({
            ...formVal,
            [name]: value
        })
    }

    const handleSubmitContact = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        await setDoc(doc(db, 'feedbacks', formVal.name), {
            id: nanoid(),
            name: formVal.name,
            email: formVal.email,
            message: formVal.message,
            sendAt: serverTimestamp()
        })
        setIsLoading(false)
        toast.success('Send Message Successfully!');
    }

    useEffect(() => {
        window.scroll(0, 0)

    }, [])


    return <Helmet title='Contact'>
        <>
            {isLoading && <Loading />}
            <BreadCrumb title={<><span>Contact</span> <span className='text-orange'>Us</span></>} />
            <div className="relative bg-background py-20">
                <img
                    className="lg:h-full w-full lg:w-1/2 absolute object-cover inset-0 object-center lg:block hidden"
                    src="https://cdn.tuk.dev/assets/templates/radian/Back_Image.png"
                    alt="map" />
                <div className="mx-auto container relative">
                    <div className="flex items-center">
                        <div className="w-full relative xl:mt-10 mb-10 2xl:pr-24 2xl:pl-0 xl:pl-12 pl-0 ">
                            <div className="w-full flex flex-col items-start xl:justify-start relative z-20 xl:px-0 px-4 xl:py-0 py-4">
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
                                        <div className="mt-4 md:mt-8">
                                            <h4 className="text-xl font-semibold">Email</h4>
                                            <h4 className="text-lg leading-8 tracking-wider mt-2">support@example.com</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:pl-24">
                            <div className="mb-10">
                                <h3 className="text-4xl md:text-5xl lg:text-7xl text-pink font-bold tracking-wider">Let's Talk</h3>
                                <h3 className="text-black text-lg leading-8 tracking-wider">For enquiries, please email us using the form below</h3>
                            </div>
                            <form className="w-full" onSubmit={handleSubmitContact}>
                                <div className="grid grid-cols-2 gap-10 mb-5">
                                    <InputText
                                        type='text'
                                        className='w-full mb-5 bg-background shadow-lg border border-slate-400 border-solid rounded-2xl px-4 py-2'
                                        placeholder='Your name'
                                        name='name'
                                        value={formVal.name}
                                        onChange={handleChangeFields}
                                    />
                                    <InputText
                                        type='text'
                                        className='w-full mb-5 bg-background shadow-lg border border-slate-400 border-solid rounded-2xl px-4 py-2'
                                        placeholder='Your Email'
                                        name='email'
                                        value={formVal.email}
                                        onChange={handleChangeFields}
                                    />
                                </div>
                                <InputTextArea
                                    className='w-full mb-5 bg-background shadow-lg border border-slate-400 border-solid rounded-2xl px-4 py-2'
                                    placeholder='Your message'
                                    name='message'
                                    value={formVal.message}
                                    onChange={handleChangeFields}
                                />
                                <div className="text-center">
                                    <ButtonCommon name='Send message' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    </Helmet>
}

export default Contact;