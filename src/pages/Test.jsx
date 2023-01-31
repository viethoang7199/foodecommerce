import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, } from "firebase/firestore";
import ProductList from '../components/UI/ProductList';
import { useDispatch } from 'react-redux';
import { productSlice } from '../store/Slice/productSlice';

const Test = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "products"), (snapShot) => {
            const product = [];
            try {
                snapShot.docs.forEach((doc) =>
                    product.push({ id: doc.id, ...doc.data() })
                );
                setProducts(product);
                dispatch(
                    productSlice.actions.GET_PRODUCTS({ ...product })
                )
            } catch (error) {
                console.log(error);
            }
        });

        return () => unsub();
    }, [])
    return (
        <div className='mt-32 flex justify-center items-center text-5xl'>
            <div className="container mx-auto">
                <ProductList
                    data={products}
                />
            </div>
        </div>
    )
}

export default Test