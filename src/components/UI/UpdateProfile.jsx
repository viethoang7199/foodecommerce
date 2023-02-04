import React, { useEffect, useState } from 'react';
import useAuth from '../../CustomHook/useAuth';
import BreadCrumb from '../common/BreadCrumb/BreadCrumb';
import ButtonCommon from '../common/ButtonCommon/ButtonCommon';
import InputText from '../common/InputText/InputText';
import Loading from './Loading';

import { collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from '../../firebase';


const UpdateProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
    })

    const { currentUser } = useAuth()

    const [formUpdate, setFormUpdate] = useState({
        fullName: '',
        email: '',
        birthday: '',
        phoneNumber: '',
        address: ''
    })

    const handleChangeFieldsUpdate = (e) => {
        const { name, value } = e.target
        setFormUpdate({
            ...formUpdate,
            [name]: value
        })
    }

    const colletionRef = collection(db, 'users');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const updateProfile = {
            displayName: formUpdate.fullName,
            email: formUpdate.email,
            birthday: formUpdate.birthday,
            phoneNumber: formUpdate.phoneNumber,
            address: formUpdate.address,
            lastUpdate: serverTimestamp(),
        };
        try {
            const profileRef = doc(colletionRef, currentUser.uid);
            updateDoc(profileRef, updateProfile);
            setIsLoading(false)
            toast.success('Update profile successfully!')
        } catch (error) {
            toast.error(error.message)
        }

    }


    document.title = 'Food - Update Profile'
    return (
        <>
            <BreadCrumb title={<><span>Update</span> <span className='text-orange'>Profile</span></>} />
            <div className="container mx-auto w-[1200px]">
                <div className='flex py-12'>
                    <form action="" className='border border-black p-10 mr-4 grow'>
                        {isLoading ?
                            <>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='mb-5'>
                                        <label htmlFor="" className='font-medium mb-1 inline-block'>Fullname</label>
                                        <InputText
                                            type='text'
                                            className='w-full border !border-dark-gray px-2 py-2 rounded-xl'
                                            placeholder='Fullname'
                                            name='fullName'
                                            value={formUpdate.fullName}
                                            onChange={handleChangeFieldsUpdate}
                                        />
                                    </div>
                                    <div className='mb-5'>
                                        <label htmlFor="" className='font-medium mb-1 inline-block'>Email</label>
                                        <InputText
                                            type='text'
                                            className='w-full border !border-dark-gray px-4 py-2 rounded-xl'
                                            placeholder="Email"
                                            name='email'
                                            value={formUpdate.email}
                                            onChange={handleChangeFieldsUpdate}
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
                                            value={formUpdate.birthday}
                                            onChange={handleChangeFieldsUpdate}
                                        />
                                    </div>
                                    <div className='mb-5'>
                                        <label htmlFor="" className='font-medium mb-1 inline-block'>Phone number</label>
                                        <InputText
                                            type='text'
                                            className='w-full border !border-dark-gray px-4 py-2 rounded-xl'
                                            placeholder="Phone number"
                                            name='phoneNumber'
                                            value={formUpdate.phoneNumber}
                                            onChange={handleChangeFieldsUpdate}
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
                                        value={formUpdate.address}
                                        onChange={handleChangeFieldsUpdate}
                                    />
                                </div>
                                <div>
                                    <ButtonCommon
                                        name='Coming soon!'
                                        onClick={handleUpdateProfile}
                                    />
                                </div>
                            </>
                            :
                            <Loading />
                        }
                    </form>

                    <div className='border border-black p-10 w-[300px]'>
                        Coming Soon!
                    </div>
                </div>

            </div>
        </>
    )

}

export default UpdateProfile