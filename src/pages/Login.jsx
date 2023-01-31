import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { BsGoogle } from 'react-icons/bs';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon';
import InputText from '../components/common/InputText/InputText';
import Loading from '../components/UI/Loading';
import { auth } from '../firebase';
import { userSlice } from '../store/Slice/userSlice';

const Login = () => {
    const [type, setType] = useState('password');
    const [eye, setEye] = useState(<FaRegEyeSlash />);

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    })

    const handleChangeField = (e) => {
        const { name, value } = e.target;
        setFormLogin({
            ...formLogin,
            [name]: value
        })
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formLogin.email, formLogin.password);
            const user = userCredential.user;
            console.log(user);
            setIsLoading(false)
            toast.success('Sign in successfully!')
            navigate('/')
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

    // const submitLogin = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true)
    //     setTimeout(() => {
    //         signInWithEmailAndPassword(auth, formLogin.email, formLogin.password)
    //             .then((userCredential) => {
    //                 const { user: refreshToken, providerData } = userCredential.user;
    //                 dispatch((
    //                     userSlice.actions.SET_USER({ user: providerData[0] })
    //                 ));
    //                 toast.success('Logged in successfully!', {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "colored",
    //                 });
    //                 localStorage.setItem("user", JSON.stringify(providerData[0]));
    //                 navigate('/')
    //                 setIsLoading(false)
    //             })
    //             .catch((error) => {
    //                 console.log(error.message);
    //             });
    //     }, 2000);
    // }

    const signInWithGoogle = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            signInWithPopup(auth, provider)
                // const abc = await signInWithRedirect(auth, provider)
                .then((result) => {
                    const { user: refreshToken, providerData } = result.user;
                    dispatch((
                        userSlice.actions.SET_USER({ user: providerData[0] })
                    ));
                    console.log(result.user);
                    toast.success('Logged in successfully!');
                    localStorage.setItem("user", JSON.stringify(providerData[0]));
                    navigate('/')
                })
        } catch (error) {
            console.log(error.message);
        }

    }


    const togglePassword = () => {
        if (type === 'password') {
            setEye(<FaRegEye />)
            setType('text')
        } else {
            setEye(<FaRegEyeSlash />)
            setType('password')
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <>
            {isLoading && <Loading />}
            <div className="login h-full pt-20">
                <div className="container mx-auto">
                    <div className="login__form w-2/4 m-auto">
                        <form
                            className='py-10 px-16 my-20 xl:w-3/5 mx-auto bg-white shadow-2xl rounded-xl'
                            onSubmit={submitLogin}
                        >
                            <div className='pb-10 text-center'>
                                <h4 className='text-6xl text-pink font-bold font-lobster'>Welcome</h4>
                                <p className='text-dark-gray text-sm'>Sign in by entering the information below</p>
                            </div>
                            <div className='text-center mb-10'>
                                <InputText
                                    type='text'
                                    className='w-full'
                                    placeholder="Email"
                                    name='email'
                                    value={formLogin.email}
                                    onChange={handleChangeField}
                                />
                            </div>
                            <div className='text-center mb-10 relative'>
                                <InputText
                                    type={type}
                                    className='w-full'
                                    placeholder="Password"
                                    name='password'
                                    value={formLogin.password}
                                    onChange={handleChangeField}
                                />
                                <span
                                    className="absolute z-10 top-2 right-2 cursor-pointer"
                                    onClick={togglePassword}
                                >{eye}</span>
                            </div>

                            <div className='mb-2'>
                                <ButtonCommon
                                    name='SIGN IN'
                                    type='submit'
                                    className='w-full rounded-full'
                                />
                            </div>
                            <div className='mb-5'>
                                <Link to='/forgot-password' className='block text-right font-medium text-dark-blue hover:text-pink hover:underline'>Forgot Password?</Link>
                            </div>
                            <div>
                                <p className='text-base text-center !text-black mt-2'>Or sign in with</p>
                                <div className='mb-5 mt-1'>
                                    <ButtonCommon
                                        className='mx-auto text-[22px] !p-[10px] rounded-full flex justify-center items-center'
                                        onClick={signInWithGoogle}
                                        name={<BsGoogle />}
                                    />
                                </div>
                            </div>

                            <div className='text-center text-base border-t border-dark-gray pt-3'>Don't have an account?&nbsp;
                                <Link to='/signup'
                                    className='text-pink hover:underline hover:text-pink font-bold'>
                                    Create an account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;