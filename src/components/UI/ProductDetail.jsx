import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsEnvelope, BsFillPencilFill, BsCalendar3, BsPerson, BsStarFill, BsStarHalf } from 'react-icons/bs';
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

import Helmet from './Helmet';
import { nanoid } from 'nanoid';

import moment from 'moment';

const ProductDetail = () => {
    const [tabs, setTabs] = useState('desc');
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [rating, setRating] = useState(5)
    const [hoverRating, setHoverRating] = useState(null)
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
    }, [])

    const { photoURL, productName, price, category, avgRating, reviews, discounted, description } = product;
    const related = products.filter(item => item.category === category)

    const handleAddToCart = (item) => {
        dispatch(
            cartSlice.actions.ADD_ITEM({
                id: item.id,
                productName: item.productName,
                price: item.price,
                discounted: item.discounted,
                image: item.img,
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
        name: '',
        content: ''
    })

    const handleChangeFieldsReview = (e) => {
        const { name, value } = e.target;
        setFormReview({
            ...formReview,
            [name]: value
        })
    }

    const colletionRef = collection(db, 'products');

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const reviews = {
            id: nanoid(),
            name: formReview.name,
            rating,
            content: formReview.content,
            dateTime: moment().format('DD MMMM, YYYY'),
        };
        try {
            const profileRef = doc(colletionRef, id);
            updateDoc(profileRef, {
                reviews: arrayUnion(reviews)
            });
            toast.success('Update profile successfully!')
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return <Helmet title={productName}>
        <>
            <BreadCrumb title={<span className='text-orange'>{productName}</span>} name={productName} />
            <div className='pt-20 h-full'>
                <div className="container m-auto">
                    <div className='lg:grid grid-cols-2 gap-6 mb-20 px-4 md:px-6 lg:px-0'>
                        <div className='p-4 md:p-12 md:w-3/4 mx-auto mb-10 lg:mb-0 rounded-xl bg-background'>
                            <img className='rounded-2xl h-[315px] object-contain m-auto' src={photoURL} alt={productName} />
                        </div>
                        <div className='px-4 md:px-8 lg:px-0'>
                            <div className='flex items-center mb-5'>
                                {
                                    [...Array(5)].map((star, index) => (
                                        <BsStarFill
                                            key={index}
                                            className='text-orange'
                                        />
                                    ))
                                }
                                <span className='text-dark-gray ml-3'>({reviews && reviews.length ? reviews.length : 0} reviews)</span>
                            </div>
                            <h2 className='text-4xl font-bold capitalize mb-2'>{productName}</h2>
                            <div className='mb-1'>
                                {discounted ? <>
                                    <span className="mb-1 mr-4 space-x-2 text-pink font-semibold text-2xl">
                                        ${discounted}
                                    </span>
                                    <span className="mb-1 space-x-2 text-dark-gray font-semibold text-2xl line-through">
                                        ${price}
                                    </span>
                                </>
                                    : <span className="mb-1 space-x-2 text-pink font-semibold text-2xl">
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
                            <div className={`w-36 md:w-52 lg:w-72 xl:w-96 text-center border border-dark-blue py-2 text-lg font-medium rounded-2xl cursor-pointer hover:bg-dark-blue hover:text-white transition-all duration-500 ease-in-out ${tabs === 'desc' ? 'bg-pink text-white border-none' : ''}`}
                                onClick={() => setTabs('desc')}>
                                Description
                            </div>
                            <div className={`w-36 md:w-52 lg:w-72 xl:w-96 text-center border border-dark-blue py-2 text-lg font-medium rounded-2xl cursor-pointer hover:bg-dark-blue hover:text-white transition-all duration-500 ease-in-out ${tabs === 'review' ? 'bg-pink text-white border-none' : ''}`}
                                onClick={() => setTabs('review')}>
                                Review
                            </div>
                        </div>
                        <hr />
                        <div className='pt-10 px-4 md:px-8 lg:px-0'>
                            {tabs === 'desc'
                                ?
                                <p className='w-full lg:w-3/4 px-4 lg:px-8 !text-black mx-auto mb-8'>{description}</p>
                                :
                                <div className='w-full lg:w-3/4 m-auto'>
                                    <div className='grid lg:grid-cols-2 gap-6'>
                                        {
                                            reviews && reviews.length === 0
                                                ?
                                                <h6>hehehe</h6>
                                                :
                                                reviews && reviews.map((item, index) => (
                                                    <div className='shadow-lg p-10 rounded-xl relative border border-solid border-light-gray'
                                                        key={index}>
                                                        <p className='text-2xl font-bold text-dark-blue mb-3 capitalize'>{item.name}</p>
                                                        <p className='mb-5 flex items-center gap-2'>
                                                            <span><BsCalendar3 /></span>
                                                            <span>{item.dateTime}</span>
                                                        </p>
                                                        <p className='text-gray-800'>{item.content}</p>
                                                        <div className='flex absolute top-6 right-4'>
                                                            {
                                                                [...Array(5)].map((star, index) => {
                                                                    const valueRating = item.rating;
                                                                    return (
                                                                        <label>
                                                                            <InputText
                                                                                className='hidden'
                                                                                type='radio'
                                                                                name='rating'
                                                                                value={valueRating}
                                                                            />
                                                                            <BsStarFill
                                                                                className={`${valueRating ? '!text-orange' : 'text-gray-300'}`}
                                                                            />
                                                                        </label>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                ))}
                                    </div>

                                    <form className='mb-8 mt-16 p-10 rounded-3xl shadow-xl'
                                        onSubmit={handleSubmitReview}
                                    >
                                        <h3 className='mb-5 text-3xl font-bold'>Add your review</h3>
                                        <div className='flex items-center mb-5'>
                                            {
                                                [...Array(5)].map((star, index) => {
                                                    const valueRating = index + 1;
                                                    return (
                                                        <label>
                                                            <InputText
                                                                className='hidden'
                                                                type='radio'
                                                                name='rating'
                                                                value={valueRating}
                                                                onClick={() => setRating(valueRating)}
                                                            />
                                                            <BsStarFill
                                                                className={`text-2xl transition-all duration-500 ease-in-out ${valueRating <= (hoverRating || rating) ? '!text-orange transition-all duration-500 ease-in-out' : 'text-gray-300'}`}
                                                                onMouseEnter={() => setHoverRating(valueRating)}
                                                                onMouseLeave={() => setHoverRating(null)}
                                                            />
                                                        </label>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='relative mb-5'>
                                            <InputText
                                                type='text'
                                                className='w-full pr-14 py-2 px-4 rounded-xl border !border-dark-gray'
                                                placeholder='Your name'
                                                name='name'
                                                value={formReview.name}
                                                onChange={handleChangeFieldsReview}
                                            />
                                            <BsPerson className='absolute top-2/4 -translate-y-2/4 right-4 text-2xl' />
                                        </div>
                                        <div className='mb-5 relative'>
                                            <InputTextArea
                                                className='w-full py-2 px-4 border !border-dark-gray'
                                                placeholder='Write a Message'
                                                name='content'
                                                value={formReview.content}
                                                onChange={handleChangeFieldsReview}
                                            />
                                            <BsFillPencilFill className='absolute top-4 right-4 text-xl' />
                                        </div>
                                        <div className='mt-5 text-center'>
                                            <ButtonCommon name='Post review' />
                                        </div>
                                    </form>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className='py-8 px-4 md:px-8 lg:px-0 bg-background'>
                    <div className='text-center'>
                        <h3 className='text-3xl md:text-4xl xl:text-5xl font-bold mb-4'>Related Products</h3>
                        <p className='w-full lg:w-3/5 xl:w-2/5 mx-auto !text-black'>Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.</p>
                    </div>
                    <div className='related w-5/6 mx-auto py-4'>
                        <ProductListSlide data={related} />
                    </div>
                </div>
            </div>
        </>
    </Helmet>
};

export default ProductDetail;