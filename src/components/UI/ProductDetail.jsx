import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsEnvelope, BsFillPencilFill, BsPerson, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../../components/common/BreadCrumb/BreadCrumb';
import { db } from '../../firebase';
import { cartSlice } from '../../store/Slice/cartSlice';
import ButtonCommon from '../common/ButtonCommon/ButtonCommon';
import InputText from '../common/InputText/InputText';
import InputTextArea from '../common/InputTextArea/InputTextArea';
import ProductListSlide from './ProductListSlide';

import { getDoc } from 'firebase/firestore';


import useGetData from '../../CustomHook/useGetData';

const ProductDetail = () => {
    const [tabs, setTabs] = useState('desc');
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const dispatch = useDispatch();

    const { data: products } = useGetData('products')

    const docRef = doc(db, 'products', id)

    useEffect(() => {
        const getProduct = async () => {
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setProduct(docSnap.data())
            } else {
                console.log('no product!');
            }
        }
        getProduct()
    }, [docRef])


    const { image, productName, price, category, avgRating, discounted, description } = product;
    const related = products.filter(item => item.category === category)

    const handleAddToCart = (item) => {
        dispatch(
            cartSlice.actions.ADD_ITEM({
                id: item.id,
                productName: item.productName,
                price: item.price,
                discounted: item.discounted,
                image: item.image,
                quantity: 1,
            })
        )
        toast.success('The product has been added to cart', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const [formReview, setFormReview] = useState({
        email: '',
        name: '',
        message: ''
    })

    const handleChangeFieldsReview = (e) => {
        const { name, value } = e.target;
        setFormReview({
            ...formReview,
            [name]: value
        })
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        await setDoc(doc(db, 'products', formReview.name), {
            name: formReview.name,
            email: formReview.email,
            message: formReview.message,
            createAt: serverTimestamp()
        })
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <>
            <BreadCrumb title={<span className='text-orange'>{productName}</span>} name={productName} />
            <div className='pt-32 h-full'>
                <div className="container m-auto">
                    <div className='grid grid-cols-2 gap-6 mb-20'>
                        <div className='p-12 w-3/4 m-auto rounded-2xl bg-background'>
                            <img className='w-3/4 m-auto' src={image} alt={productName} />
                        </div>
                        <div>
                            <h2 className='text-4xl font-bold capitalize mb-2'>{productName}</h2>
                            <div className='flex items-center mb-5'>
                                <span><BsStarFill className='text-orange' /></span>
                                <span><BsStarFill className='text-orange' /></span>
                                <span><BsStarFill className='text-orange' /></span>
                                <span><BsStarFill className='text-orange' /></span>
                                <span><BsStarHalf className='text-orange' /></span>
                                <span className='text-dark-gray ml-3'>({avgRating} ratings)</span>
                            </div>
                            <div className='mb-1'>
                                {discounted ? <>
                                    <span className="mb-1 mr-4 space-x-2 text-pink font-bold text-2xl">
                                        ${discounted}
                                    </span>
                                    <span className="mb-1 space-x-2 text-dark-gray font-bold text-2xl line-through">
                                        ${price}
                                    </span>
                                </>
                                    : <span className="mb-1 space-x-2 text-pink font-bold text-2xl">
                                        ${price}
                                    </span>
                                }
                            </div>

                            {discounted ?
                                <div className='mb-5'>
                                    <p className='text-pink text-sm font-medium'>
                                        Discount: ${(price - discounted)}
                                        <span className='ml-2'>({Math.ceil(((price - discounted) / price) * 100)}%)</span>
                                    </p>
                                </div> : ''
                            }
                            <div className='mb-5'>
                                <span className='font-bold mr-2 text-lg'>Category:</span>
                                <span className='capitalize'>{category}</span>
                            </div>

                            <div className='mb-7'>
                                <div className='w-64'>
                                    <ButtonCommon
                                        name='Add to cart'
                                        onClick={() => handleAddToCart(product)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-center items-center gap-5 mb-10'>
                            <div className={`w-96 text-center border border-dark-blue py-2 text-lg font-medium rounded-2xl cursor-pointer hover:bg-dark-blue hover:text-white transition-all duration-500 ease-in-out ${tabs === 'desc' ? 'bg-pink text-white border-none' : ''}`}
                                onClick={() => setTabs('desc')}>
                                Description
                            </div>
                            <div className={`w-96 text-center border border-dark-blue py-2 text-lg font-medium rounded-2xl cursor-pointer hover:bg-dark-blue hover:text-white transition-all duration-500 ease-in-out ${tabs === 'review' ? 'bg-pink text-white border-none' : ''}`}
                                onClick={() => setTabs('review')}>
                                Review
                            </div>
                        </div>
                        <hr />
                        <div className='mt-10 pb-20'>
                            {tabs === 'desc'
                                ?
                                <p className='w-3/4 !text-black mx-auto mb-8'>{description}</p>
                                :
                                <div className='w-3/4 m-auto'>
                                    <div className='grid grid-cols-2 gap-6'>
                                        {/* {reviews.map((item, index) => (
                                            <div className='shadow-2xl p-10 rounded-xl relative border border-solid border-light-gray'
                                                key={index}>
                                                <p className='text-2xl font-bold text-dark-blue mb-3 capitalize'>{item.name}</p>
                                                <p className='mb-5 flex items-center gap-2'>
                                                    <span><BsCalendar3 /></span>
                                                    <span>{item.dateTime}</span>
                                                </p>
                                                <p className='text-dark-gray'>{item.text}</p>
                                                <div className='flex absolute top-6  right-4'>
                                                    <span><BsStarFill className='text-orange' /></span>
                                                    <span><BsStarFill className='text-orange' /></span>
                                                    <span><BsStarFill className='text-orange' /></span>
                                                    <span><BsStarFill className='text-orange' /></span>
                                                    <span><BsStarFill className='text-orange' /></span>
                                                </div>
                                            </div>
                                        ))} */}
                                    </div>
                                    <form className='mb-8 mt-16 p-10 rounded-3xl shadow-2xl'
                                        onSubmit={handleSubmitReview}
                                    >
                                        <h3 className='mb-5 text-3xl font-bold'>Add your review</h3>
                                        <div className='grid grid-cols-1 mb-5 relative'>
                                            <InputTextArea
                                                className='px-10 py-4 border !border-dark-gray'
                                                placeholder='Write a Message'
                                                name='message'
                                                value={formReview.message}
                                                onChange={handleChangeFieldsReview}
                                            />
                                            <BsFillPencilFill className='absolute top-4 right-8 text-xl' />
                                        </div>
                                        <div className='grid grid-cols-2 gap-5'>
                                            <div className='relative'>
                                                <InputText
                                                    type='text'
                                                    className='w-full pr-14 py-2 p-4 rounded-xl border !border-dark-gray'
                                                    placeholder='Your name'
                                                    name='name'
                                                    value={formReview.name}
                                                    onChange={handleChangeFieldsReview}
                                                />
                                                <BsPerson className='absolute top-2/4 -translate-y-2/4 right-4 text-2xl' />
                                            </div>
                                            <div className='relative'>
                                                <InputText
                                                    type='text'
                                                    className='w-full pr-14 py-2 p-4 rounded-xl border !border-dark-gray'
                                                    placeholder='Your email'
                                                    name='email'
                                                    value={formReview.email}
                                                    onChange={handleChangeFieldsReview}
                                                />
                                                <BsEnvelope className='absolute top-2/4 -translate-y-2/4 right-4 text-2xl' />
                                            </div>
                                        </div>
                                        <div className='mt-5 text-center'>
                                            <ButtonCommon name='Coming Soon!' />
                                        </div>
                                    </form>
                                </div>}
                        </div>

                        <div className='py-8'>
                            <div className='text-center'>
                                <h3 className='text-5xl font-bold mb-4'>Related Products</h3>
                                <p className='w-2/5 mx-auto !text-black mb-6'>Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.</p>
                            </div>
                            <div className='related w-5/6 mx-auto py-4'>
                                <ProductListSlide data={related} />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default ProductDetail;