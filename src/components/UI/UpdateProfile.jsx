import React, { useEffect, useState } from 'react';
import InputText from '../common/InputText/InputText';
import Loading from './Loading'

const UpdateProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
    })
    return (
        <>
            {isLoading ?
                <>
                    <div className='mt-32 h-screen'>
                        <div className="container mx-auto w-[1200px]">
                            <div className='flex'>
                                <form action="" className='border border-black p-10 mr-4 grow'>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='font-medium mb-1 inline-block'>Fullname</label>
                                            <InputText
                                                type='text'
                                                className='w-full border !border-dark-gray px-2 py-2 rounded-xl'
                                                placeholder="Fullname"
                                                name='fullname'
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='font-medium mb-1 inline-block'>Email</label>
                                            <InputText
                                                type='text'
                                                className='w-full border !border-dark-gray px-4 py-2 rounded-xl'
                                                placeholder="Email"
                                                name='email'
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className='mb-5'>
                                            <label htmlFor="" className='font-medium mb-1 inline-block'>Birthday</label>
                                            <InputText
                                                type='text'
                                                className='w-full border !border-dark-gray px-4 py-2 rounded-xl'
                                                placeholder="Birthday"
                                                name='birthday'
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='font-medium mb-1 inline-block'>Phone number</label>
                                            <InputText
                                                type='text'
                                                className='w-full border !border-dark-gray px-4 py-2 rounded-xl'
                                                placeholder="Phone number"
                                                name='phone'
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-5'>
                                        <label htmlFor="" className='font-medium mb-1 inline-block'>Address</label>
                                        <InputText
                                            type='text'
                                            className='w-full border !border-dark-gray px-4 py-2 rounded-xl'
                                            placeholder="Address"
                                            name='address'
                                        />
                                    </div>
                                </form>

                                <div className='border border-black p-10 w-[300px]'>
                                    set hình ảnh
                                </div>
                            </div>
                        </div>
                    </div>
                </>




                : <Loading />}
        </>
    )
}

export default UpdateProfile