import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb';
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon';
import InputText from '../components/common/InputText/InputText';
import InputTextArea from '../components/common/InputTextArea/InputTextArea';
import Loading from '../components/UI/Loading';
import { db } from '../firebase';
import { cartSlice } from '../store/Slice/cartSlice';


const Checkout = () => {

    const cartList = useSelector(state => state.cartList.cartItems);
    const totalAmount = useSelector(state => state.cartList.totalAmount);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const removeCartItem = (cartItemId) => {
        setLoading(true);
        setTimeout(() => {
            dispatch(cartSlice.actions.REMOVE_ITEM(cartItemId));
            setLoading(false)
            toast.success('The product has been removed from the cart');
        }, 1000)
    }

    const [formVal, setFormVal] = useState({
        id: nanoid(),
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        notes: ''
    })

    const pImg = cartList.map(item => item.image)
    const pName = cartList.map(item => item.productName);
    const pPrice = cartList.map(item => item.price);
    const pQuantity = cartList.map(item => item.quantity);

    const information = {
        id: nanoid(),
        fullName: formVal.fullName,
        email: formVal.email,
        phoneNumber: formVal.phoneNumber,
        address: formVal.address,
        notes: formVal.notes,
        orderAt: serverTimestamp(),
    };

    const handleChangeFields = (e) => {
        const { name, value } = e.target;
        setFormVal({
            ...formVal,
            [name]: value
        })
    }
    const shipingCost = 2.00
    const placeOrder = async () => {
        setLoading(true)
        await setDoc(doc(db, 'orders', information.id), {
            information,
            cartList,
            // products: cartList,
            status: 'wait for confirmation',
            totalPrice: totalAmount + shipingCost
        })
        setLoading(false)
        toast.success('Order Successfullyyyyyyyyyyyyyyy!');
    }

    useEffect(() => {
        // window.scroll(0, 0)
    }, [])

    // const [values, setValues] = useState([])
    // console.log(values, 'values');

    // useEffect(() => {
    //     const fetchDataCity = async () => {
    //         const res = await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
    //         const resCity = await res.json();
    //         setValues(resCity)
    //     }
    //     fetchDataCity();
    // }, [])
    return (
        <>
            {loading && <Loading />}
            <BreadCrumb />
            <div className='bg-light-gray'>
                {cartList.length > 0 ? <div className="container py-12 h-auto mx-auto ">
                    <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                        <div className="flex flex-col md:w-3/5 shadow-xl p-6 rounded-xl">
                            <h2 className="mb-4 font-bold text-2xl text-heading ">Shipping Address
                            </h2>
                            <form className="justify-center w-full mx-auto" >
                                <div className="">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <label htmlFor="fullName" className="block mb-3 text-sm font-semibold text-gray-500">Full Name</label>
                                            <InputText
                                                className="w-full px-4 py-3 text-sm border !border-dark-gray rounded lg:text-sm"
                                                name="fullName"
                                                type="text"
                                                placeholder="Full Name"
                                                value={formVal.fullName}
                                                onChange={handleChangeFields}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="phoneNumber" className="block mb-3 text-sm font-semibold text-gray-500">Phone number</label>
                                            <InputText
                                                className="w-full px-4 py-3 text-sm border !border-dark-gray rounded lg:text-sm"
                                                name="phoneNumber"
                                                type="text"
                                                placeholder="Phone number"
                                                value={formVal.phoneNumber}
                                                onChange={handleChangeFields}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label htmlFor="Email"
                                                className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                            <InputText
                                                className="w-full px-4 py-3 text-sm border !border-dark-gray rounded lg:text-sm"
                                                name="email"
                                                type="text"
                                                placeholder="Email"
                                                value={formVal.email}
                                                onChange={handleChangeFields}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='mt-4'>
                                        <select className="py-2 px-4 rounded border border-gray-500"
                                        >
                                            <option value=''>Chọn tỉnh thành</option>
                                            {
                                                values.map((item) => (
                                                    <option key={item.Id} value={item.Id}>{item.Name}</option>
                                                ))
                                            }
                                        </select>
                                        <select className="py-2 px-4 rounded border border-gray-500">
                                            <option value=''>Chọn quận huyện</option>
                                            {
                                                values.map((item) => (
                                                    <option key={item.Id} value={item.Id}>{item.Id}</option>
                                                ))
                                            }
                                        </select>
                                        <select className="py-2 px-4 rounded border border-gray-500">
                                            <option value=''>Chọn phường xã</option>
                                        </select>
                                    </div> */}
                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label htmlFor="Address"
                                                className="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                            <InputTextArea
                                                className="w-full px-4 py-3 text-xs border !border-dark-gray !rounded lg:text-sm"
                                                name="address"
                                                cols="20"
                                                rows="4"
                                                placeholder="Address"
                                                value={formVal.address}
                                                onChange={handleChangeFields}
                                            />
                                        </div>
                                    </div>
                                    <div className="relative mt-4">
                                        <label htmlFor="note"
                                            className="block mb-3 text-sm font-semibold text-gray-500"> Notes
                                            (Optional)
                                        </label>
                                        <InputTextArea
                                            name="notes"
                                            className="flex items-center w-full px-4 py-3 text-sm border !border-gray-300 !rounded"
                                            rows="4"
                                            placeholder="Notes htmlFor delivery"
                                            value={formVal.notes}
                                            onChange={handleChangeFields}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5 shadow-xl p-4 rounded-xl">
                            <div className="pt-12 md:pt-0 2xl:ps-4">
                                <div className='border-b border-dark-gray border-solid pb-5'>
                                    <h4 className="text-2xl font-bold">Ordering cart</h4>
                                    <p className='text-sm !text-black'>You have {cartList.length} items in your cart</p>
                                </div>

                                <div className='py-4 border-b border-dark-gray border-solid'>
                                    {cartList.map(cart => (
                                        <div className='flex items-center mb-2 relative' key={cart.id}>
                                            <img
                                                src={cart.image}
                                                alt="img"
                                                className='w-32'
                                            />
                                            <div className='grow ml-5'>
                                                <h2 className="text-xl font-bold mb-2">{cart.productName}</h2>
                                                <div className='flex justify-between items-center'>
                                                    <p className="text-pink font-semibold">
                                                        {cart.discounted ? <>
                                                            <span className="mr-2 text-pink font-bold text-base">
                                                                {cart.discounted}
                                                            </span>
                                                            <span className="text-dark-gray font-bold text-base line-through">
                                                                {cart.price}
                                                            </span>
                                                        </>
                                                            : <span className="text-pink font-bold text-base">
                                                                {cart.price}
                                                            </span>
                                                        }
                                                    </p>
                                                    <p className='text-black'>
                                                        <span>Qty: </span>
                                                        <span>{cart.quantity}</span>
                                                    </p>
                                                    <p className='text-black font-medium'>
                                                        <span>Total: </span>
                                                        <span>${cart.totalPrice}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <motion.div
                                                whileTap={{ scale: 0.6 }}
                                                className='absolute top-2 right-2 cursor-pointer'>
                                                <ButtonCommon
                                                    className='!p-1'
                                                    name={<FaTimes />}
                                                    loading={loading}
                                                    onClick={() => removeCartItem(cart.id)}
                                                />
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>

                                <div className="py-4 border-b border-dark-gray border-solid">
                                    <div className='py-4 text-dark-blue font-medium flex justify-between items-center'>
                                        <span>Subtotal</span>
                                        <span>${totalAmount}</span>
                                    </div>
                                    <div className='py-4 border-t border-light-gray border-solid text-dark-blue font-medium flex justify-between items-center'>
                                        <span>Shipping cost</span>
                                        <span>$2.00</span>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <div className='text-lg text-dark-blue font-bold flex justify-between items-center'>
                                        <span>Total payable</span>
                                        <span>${totalAmount + 2.00}</span>
                                    </div>
                                    <div className='mt-5'>
                                        <ButtonCommon
                                            name='Place order'
                                            className='w-full'
                                            onClick={placeOrder}
                                        />
                                    </div>
                                    <p className='mt-5 !text-black'>By providing your information, you agree to our <Link className='text-pink hover:underline'>Privacy policy</Link> and <Link className='text-pink hover:underline'>Terms of Service.</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    :
                    <div className='h-screen flex justify-center items-center flex-col'>
                        <p className='text-5xl font-bold mb-5'>Thêm sản phẩm vào giỏ hàng rồi quay lại đây!</p>
                        <Link to='/shop'>
                            <ButtonCommon name='Return to shop' />
                        </Link>
                    </div>
                }
            </div>
        </>
    );
};

export default Checkout;