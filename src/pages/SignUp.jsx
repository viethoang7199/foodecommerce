import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsGoogle } from 'react-icons/bs';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon';
import InputText from '../components/common/InputText/InputText';
import Loading from "../components/UI/Loading";
import { auth, db } from '../firebase';
import { userSlice } from "../store/Slice/userSlice";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import Avatar from '../assets/images/avatar/avatar.png'

const SignUp = () => {

    const [type, setType] = useState('password');
    const [eye, setEye] = useState(<FaRegEyeSlash />);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();
    const [imgUpload, setImgUpload] = useState(null);


    const [formSignUp, setFormSignUp] = useState({
        fullName: '',
        email: '',
        password: '',
    })

    const handleChangeFields = (e) => {
        const { name, value } = e.target;
        setFormSignUp({
            ...formSignUp,
            [name]: value
        })
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const { user: refreshToken, providerData } = result.user;
                dispatch((
                    userSlice.actions.SET_USER({ user: providerData[0] })
                ));
                toast.success('Logged in successfully!');
                localStorage.setItem("user", JSON.stringify(providerData[0]));
                navigate('/')
            }).catch((error) => {
                console.log(error.message);
            });
    }

    // const submitSignup = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true)
    //     try {
    //         const userCredential = await createUserWithEmailAndPassword(auth, formSignUp.email, formSignUp.password)
    //         const user = userCredential.user;
    //         // await updateProfile(user, { displayName: `${formSignUp.fullName}` });
    //         const storageRef = ref(storage, `avatar/${formSignUp.fullName}`);
    //         const uploadTask = uploadBytesResumable(storageRef, imgUpload);

    //         uploadTask.on((error) => {
    //             console.log(error.message);
    //         }, () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadurl) => {
    //                 await updateProfile(user, {
    //                     displayName: formSignUp.fullName,
    //                     photoURL: Avatar || downloadurl,
    //                 })
    //                 await setDoc(doc(db, 'users', user.uid), {
    //                     uid: user.uid,
    //                     displayName: formSignUp.fullName,
    //                     email: formSignUp.email,
    //                     photoURL: Avatar || downloadurl,
    //                     createdAt: serverTimestamp(),
    //                     birthday: '',
    //                     address: '',
    //                     phoneNumber: ''
    //                 })
    //             })
    //         })
    //         setIsLoading(false)
    //         navigate('/')
    //     } catch (error) {
    //         console.log(error.message);
    //     }

    //     // uploadBytes(imageRef, imgUpload)
    //     //     .then(() => {
    //     //         getDownloadURL(imageRef).then((url) => {
    //     //         }).catch(error => {
    //     //             console.log(error.message, "loi ne");
    //     //         });
    //     //     }).catch(error => {
    //     //         console.log(error);
    //     //     })
    //     // setTimeout(async () => {
    //     //     try {
    //     //         const userCredential = await createUserWithEmailAndPassword(auth, formSignUp.email, formSignUp.password)
    //     //         const user = userCredential.user;
    //     //         // await updateProfile(user, { displayName: `${formSignUp.fullName}` });
    //     //         const storageRef = ref(storage, `Images/ ${formSignUp.fullName}`);
    //     //         const uploadTask = uploadBytesResumable(storageRef, imgUpload);

    //     //         uploadTask.on((error) => {
    //     //             console.log(error.message);
    //     //         }, () => {
    //     //             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadurl) => {
    //     //                 await updateProfile(user, {
    //     //                     displayName: formSignUp.fullName,
    //     //                     photoURL: downloadurl,
    //     //                 })
    //     //                 await setDoc(doc(db, 'users', formSignUp.fullName), {
    //     //                     uid: user.uid,
    //     //                     displayName: formSignUp.fullName,
    //     //                     email: formSignUp.email,
    //     //                     photoURL: downloadurl,
    //     //                     dateTime: serverTimestamp(),
    //     //                 })
    //     //             })
    //     //         })
    //     //         // dispatch(
    //     //         //     userSlice.actions.SET_USER(
    //     //         //         await setDoc(doc(db, "users", formSignUp.fullName), {
    //     //         //             uid: user.uid,
    //     //         //             displayName: formSignUp.fullName,
    //     //         //             email: formSignUp.email,
    //     //         //             photoURL: imgUpload,
    //     //         //             dateTime: serverTimestamp(),
    //     //         //         })
    //     //         //     )
    //     //         // )
    //     //         // navigate('/')
    //     //         // toast.success('Đăng ký thành công! Đăng nhập cho bạn luôn rồi đó!', {
    //     //         //     position: "top-center",
    //     //         //     autoClose: 3000,
    //     //         //     hideProgressBar: false,
    //     //         //     closeOnClick: true,
    //     //         //     pauseOnHover: true,
    //     //         //     draggable: true,
    //     //         //     progress: undefined,
    //     //         //     theme: "colored",
    //     //         // });
    //     //         setIsLoading(false)
    //     //     } catch (error) {
    //     //         console.log(error.message);
    //     //     }
    //     // }, 2000);
    // }

    const submitSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formSignUp.email, formSignUp.password);

            const user = userCredential.user;

            const storageRef = ref(storage, `avatar/ ${Date.now() + ' ' + formSignUp.fullName}`);
            const uploadTask = uploadBytesResumable(storageRef, imgUpload);

            uploadTask.on((error) => {
                toast.error(error.message);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(user, {
                        displayName: formSignUp.fullName,
                        photoURL: downloadURL,
                    });
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        displayName: formSignUp.fullName,
                        email: formSignUp.email,
                        photoURL: downloadURL,
                    })
                })
            });

            setIsLoading(false);
            toast.success('Account created successfully!');
            navigate('/login');

        } catch (error) {
            setIsLoading(false);
            toast.error('something went wrong!');
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
            <div className="signup h-full pt-20">
                <div className="container mx-auto">
                    <div className="signup__form w-2/4 m-auto">

                        <form
                            className='py-10 px-12 my-20 xl:w-3/5 mx-auto bg-white shadow-2xl rounded-xl'
                            onSubmit={submitSignup}
                        >
                            <div className='pb-10 text-center'>
                                <h4 className='text-6xl text-pink font-bold font-lobster mb-2'>Register</h4>
                                <p className='text-dark-gray text-sm'>Sign up by entering the information below</p>
                            </div>
                            <div className='text-center mb-10'>
                                <InputText
                                    type='text'
                                    className='w-full'
                                    placeholder="Fullname"
                                    name='fullName'
                                    value={formSignUp.fullName}
                                    onChange={handleChangeFields}
                                />
                            </div>
                            <div className='text-center mb-10'>
                                <InputText
                                    type='text'
                                    className='w-full'
                                    placeholder="Email"
                                    name='email'
                                    value={formSignUp.email}
                                    onChange={handleChangeFields}
                                />
                            </div>
                            <div className='text-center mb-10 relative'>
                                <InputText
                                    type={type}
                                    className='w-full'
                                    placeholder="Password"
                                    name='password'
                                    value={formSignUp.password}
                                    onChange={handleChangeFields}
                                />
                                <span
                                    className="absolute z-10 top-2/4 -translate-y-2/4 right-2 cursor-pointer"
                                    onClick={togglePassword}
                                >{eye}</span>
                            </div>
                            <div className='mb-10'>
                                <span className="mb-1">Avatar</span>
                                <hr className="mb-2" />
                                <InputText
                                    type='file'
                                    className='w-full border-none'
                                    onChange={(e) => setImgUpload(e.target.files[0])}
                                />
                            </div>
                            <div>
                                <ButtonCommon
                                    className='w-full mb-5'
                                    type='submit'
                                    name='Sign Up'
                                />
                            </div>

                            <div className="mb-5">
                                <p className='text-center !text-black text-base'>By providing your email address, you agree to our&nbsp; <br />
                                    <Link
                                        className='text-blue-500 hover:underline hover:text-blue-800'>
                                        Privacy Policy&nbsp;
                                    </Link>
                                    and&nbsp;
                                    <Link
                                        className='text-blue-500 hover:underline hover:text-blue-800'>
                                        Terms of Service
                                    </Link>.
                                </p>
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
                            <hr className="mb-3" />
                            <div className='text-center text-base'>Already have an account?&nbsp;
                                <Link to='/login'
                                    className='text-pink hover:underline hover:text-pink font-bold'>
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;