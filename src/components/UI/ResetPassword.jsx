import React from 'react';
import { toast } from 'react-toastify';
import ButtonCommon from '../common/ButtonCommon/ButtonCommon';
import InputText from '../common/InputText/InputText';

const ResetPassword = () => {
    const changePassword = (e) => {
        e.preventDefault();
        toast.info('Coming Soon!');
    }
    return (
        <div>
            <section className="reset__password bg-background">
                <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-background rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight md:text-3xl text-center">
                            Change Password
                        </h2>
                        <form className="mt-4"
                            onSubmit={changePassword}
                        >
                            <div className='text-center mb-10'>
                                <InputText
                                    type='text'
                                    className='w-full px-4 py-2 border !border-dark-gray rounded-xl'
                                    placeholder="Email"
                                    name='email'
                                />
                            </div>
                            <div className='text-center mb-10'>
                                <InputText
                                    type='text'
                                    className='w-full px-4 py-2 border !border-dark-gray rounded-xl'
                                    placeholder="Password"
                                    name='password'
                                />
                            </div>
                            <div className='text-center mb-10'>
                                <InputText
                                    type='text'
                                    className='w-full px-4 py-2 border !border-dark-gray rounded-xl'
                                    placeholder="Confirm Password"
                                    name='cpassword'
                                />
                            </div>
                            <div>
                                <ButtonCommon name='Reset password' className='w-full' />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResetPassword;