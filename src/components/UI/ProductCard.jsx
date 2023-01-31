import React from 'react';
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cartSlice } from '../../store/Slice/cartSlice';
import ButtonCommon from '../common/ButtonCommon/ButtonCommon';

const ProductCard = ({ item }) => {

    const dispatch = useDispatch()
    const handleAddToCart = () => {
        dispatch(
            cartSlice.actions.ADD_ITEM({
                id: item.id,
                imgUrl: item.imgUrl,
                productName: item.productName,
                price: item.price,
            })
        )
        toast.success('Product added successfully!');
    }

    return (
        <div className='product relative text-center mt-5 bg-white p-4 drop-shadow-lg rounded-xl duration-500 transition-all before:w-full before:h-2 before:bg-pink before:absolute before:bottom-0 before:left-0 before:opacity-0 before:rounded-br-xl before:rounded-bl-xl before:transition-all before:duration-500 hover:before:opacity-100 hover:before:transition-all hover:before:duration-500 hover:drop-shadow-2xl hover:shadow-2xl hover:duration-500 hover:transition-all'>
            <div>
                {item.discounted ? <>
                    <div className='p-2 bg-pink absolute top-0 right-0 rounded-xl'>
                        <span className='text-white'>-{Math.ceil(((item.price - item.discounted) / item.price) * 100)}%</span>
                    </div>
                </> : ''}
                <div className='h-[230px]'>
                    <Link to={`/shop/${item.id}`}>
                        <img
                            className='duration-1000 hover:scale-110 hover:duration-1000 h-[200px] w-[250px] object-contain mx-auto'
                            src={item.img}
                            alt={item.productName}
                        />
                    </Link>
                </div>
                <div>
                    <Link to={`/shop/${item.id}`}>
                        <span className='font-bold mt-5 mb-3 block capitalize text-xl hover:text-pink'>{item.productName}</span>
                    </Link>
                    <div className='mb-5'>
                        {item.discounted ? <>
                            <span className="font-bold text-lg text-pink mr-2">
                                ${item.discounted}
                            </span>
                            <span className="text-dark-gray font-bold text-lg line-through">
                                ${item.price}
                            </span>
                        </>
                            : <span className="font-bold text-lg text-pink">
                                ${item.price}
                            </span>
                        }
                    </div>
                    <div className='w-12 mx-auto mt-3'>
                        <ButtonCommon
                            name={<MdAddShoppingCart className='text-xl' />}
                            onClick={handleAddToCart}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;