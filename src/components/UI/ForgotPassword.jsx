import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonCommon from '../common/ButtonCommon/ButtonCommon';
import InputText from '../common/InputText/InputText';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';


const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const resetPassword = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.info('Check Email đi');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='forgot-password bg-background pt-20'>
            <div className="container mx-auto">
                <div className="flex justify-center px-6 py-20">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover shadow-2xl rounded-xl rounded-r-none">
                            <img className='rounded-xl rounded-r-none' src="https://img.freepik.com/premium-vector/forgot-password-concept-isolated-white_263070-194.jpg" alt="" />
                        </div>
                        <div className="w-full lg:w-1/2 bg-background shadow-2xl p-5 rounded-xl lg:rounded-l-none">
                            <div className="px-8 mb-4 text-center">
                                <h3 className="pt-4 mb-2 text-[28px] font-bold">Forgot Your Password?</h3>
                                <p className="mb-4 text-sm text-dark-gray">
                                    We get it, stuff happens. Just enter your email address below and we'll send you a
                                    link to reset your password!
                                </p>
                            </div>
                            <form className="px-8 pt-6 pb-8 mb-4"
                                onSubmit={resetPassword}
                            >
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Email
                                    </label>
                                    <InputText
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 !border-dark-gray border rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Enter Email Address..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <ButtonCommon
                                        className="w-full text-white rounded-full"
                                        name='Reset Password'
                                    />
                                </div>
                            </form>

                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <Link to='/signup'
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                >
                                    Create an Account!
                                </Link>
                            </div>
                            <div className="text-center">
                                <Link to='/login'
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                >
                                    Already have an account? Login!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;