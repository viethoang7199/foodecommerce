import React, { useEffect, useState } from 'react';
import BackToTop from '../components/common/BackToTop/BackToTop';
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb';
import InputText from '../components/common/InputText/InputText';
import Pagination from '../components/Pagination/Pagination';
import ProductList from '../components/UI/ProductList';

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import useGetData from '../CustomHook/useGetData';
import Helmet from '../components/UI/Helmet'

const Product = () => {

    const { data: products } = useGetData('products')

    const productsData = products

    const [productList, setProductList] = useState(productsData);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const [category, setCategory] = useState('all');
    const [fix, setFix] = useState(false);
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProduct = productList.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "products"), (snapShot) => {
            let commit = [];
            try {
                snapShot.docs.forEach((doc) =>
                    commit.push({ id: doc.id, ...doc.data() })
                );
                setProductList(commit);
            } catch (error) {
                console.log(error);
            }
        });

        return () => unsub();
    }, [])

    useEffect(() => {
        if (category === 'all') {
            setProductList(productsData);
        }
        if (category === 'pizza') {
            const filtered = productsData.filter(item => item.category === 'pizza')
            setProductList(filtered)
        }
        if (category === 'hamburger') {
            const filtered = productsData.filter(item => item.category === 'hamburger')
            setProductList(filtered)
        }
        if (category === 'salad') {
            const filtered = productsData.filter(item => item.category === 'salad')
            setProductList(filtered)
        }
        if (category === 'spaghetti') {
            const filtered = productsData.filter(item => item.category === 'spaghetti')
            setProductList(filtered)
        }
        if (category === 'drink') {
            const filtered = productsData.filter(item => item.category === 'drink')
            setProductList(filtered)
        }
    }, [category, productsData])

    const handleSearch = (e) => {
        const searchProduct = e.target.value;
        const searchedProduct = products.filter(item => item.productName.toLowerCase().includes(searchProduct.toLowerCase()) || item.category.toLowerCase().includes(searchProduct.toLowerCase()))
        setProductList(searchedProduct)
    }
    const handleSort = (e) => {
        const sortProduct = e.target.value;
        if (sortProduct === 'priceLowest') {
            const priceLowest = [...productList].sort((a, b) => a.price - b.price);
            setProductList(priceLowest)
        }
        if (sortProduct === 'priceHighest') {
            const priceHighest = [...productList].sort((a, b) => b.price - a.price);
            setProductList(priceHighest)
        }
        if (sortProduct === 'nameAz') {
            const nameAz = [...productList].sort((a, b) =>
                a.productName > b.productName ? 1 : -1,
            );
            setProductList(nameAz)
        }
        if (sortProduct === 'nameZa') {
            const nameZa = [...productList].sort((a, b) =>
                a.productName > b.productName ? -1 : 1,
            );
            setProductList(nameZa)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 430) {
                setFix(true)
            } else {
                setFix(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    const [filterMobile, setFilterMobile] = useState(false)

    return <Helmet title='Shop'>
        <>
            <BackToTop />
            <BreadCrumb title='Shop' />
            <div className='container mx-auto mt-20 px-4'>
                <div className='flex justify-start  mb-10'>
                    <div className={`rounded-2xl shadow-2xl py-8 min-w-[250px] max-w-[250px] w-full relative h-auto  ${filterMobile ? 'block' : 'block'}`}>
                        <div className={`${fix ? 'sticky top-28' : ''}`}>
                            <div className='widget__filter__cat'>
                                <h4 className='text-dark-gray lg:text-xl xl:text-2xl text-center mb-3 uppercase font-semibold px-4'>Category</h4>
                                <div className='mb-10'>
                                    <div
                                        className={`px-4 py-2 mx-3 cursor-pointer hover:shadow-xl hover:font-semibold rounded-lg transition-all duration-300 ease-in-out ${category === "all" ? "bg-pink text-white font-bold drop-shadow-lg" : ""}`}
                                        onClick={() => setCategory('all')}>
                                        <span className='text-lg'>All</span>
                                    </div>
                                    <div
                                        className={`px-4 py-2 mx-3 cursor-pointer hover:shadow-xl hover:font-semibold rounded-lg transition-all duration-300 ease-in-out ${category === "pizza" ? "bg-pink text-white drop-shadow-lg font-bold" : ""}`}
                                        onClick={() => setCategory('pizza')}>
                                        <span className='text-lg'>Pizza</span>
                                    </div>
                                    <div
                                        className={`px-4 py-2 mx-3 cursor-pointer hover:shadow-xl hover:font-semibold rounded-lg transition-all duration-300 ease-in-out ${category === "hamburger" ? "bg-pink text-white drop-shadow-lg font-bold" : ""}`}
                                        onClick={() => setCategory('hamburger')}>
                                        <span className='text-lg'>Hamburger</span>
                                    </div>
                                    <div
                                        className={`px-4 py-2 mx-3 cursor-pointer hover:shadow-xl hover:font-semibold rounded-lg transition-all duration-300 ease-in-out ${category === "salad" ? "bg-pink text-white drop-shadow-lg font-bold" : ""}`}
                                        onClick={() => setCategory('salad')}>
                                        <span className='text-lg'>Salad</span>
                                    </div>
                                    <div
                                        className={`px-4 py-2 mx-3 cursor-pointer hover:shadow-xl hover:font-semibold rounded-lg transition-all duration-300 ease-in-out ${category === "spaghetti" ? "bg-pink text-white drop-shadow-lg font-bold" : ""}`}
                                        onClick={() => setCategory('spaghetti')}>
                                        <span className='text-lg'>Spaghetti</span>
                                    </div>
                                    <div
                                        className={`px-4 py-2 mx-3 cursor-pointer hover:shadow-xl hover:font-semibold rounded-lg transition-all duration-300 ease-in-out ${category === "drink" ? "bg-pink text-white drop-shadow-lg font-bold" : ""}`}
                                        onClick={() => setCategory('drink')}>
                                        <span className='text-lg'>Drink</span>
                                    </div>
                                </div>
                            </div>
                            <div className='widget__filter__price'>
                                <h4 className='text-dark-gray lg:text-xl xl:text-2xl text-center mb-3 uppercase font-semibold px-4'>Filter by price</h4>
                                <div className='widget__filter__price-range'>
                                    <div className='px-4 py-2 mx-3 cursor-pointer hover:shadow-xl hover:font-semibold rounded-lg transition-all duration-300 ease-in-out'>
                                        <span className='text-lg'>Coming soon!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:pl-8 grow'>
                        <div className='flex justify-between mb-10 shadow-lg px-10 py-6 rounded-xl w-full'>

                            <div className='bg-pink text-white p-4'
                                onClick={() => setFilterMobile(!filterMobile)}
                            >
                                Click
                            </div>

                            <div className='grow hidden lg:block'>
                                <InputText
                                    type='text'
                                    className='px-6 py-2 w-3/4 shadow-lg border !border-dark-gray border-solid rounded-2xl'
                                    placeholder='Coming Soon!...'
                                    onChange={handleSearch}
                                />
                            </div>
                            <select
                                className='shadow-xl outline-none py-2 px-4 border border-dark-gray border-solid rounded-2xl cursor-pointer'
                                onChange={handleSort}
                            >
                                <option>Sort By ...</option>
                                <option value='priceLowest'>Price (Lowest)</option>
                                <option value='priceHighest'>Price (Highest)</option>
                                <option value='nameAz'>Name (A-Z)</option>
                                <option value='nameZa'>Name (Z-A)</option>
                            </select>

                        </div>
                        {currentProduct.length > 0
                            ?
                            <ProductList data={currentProduct} />
                            :
                            <p className='text-2xl !text-black text-center'>No products are found!</p>}
                        <Pagination totalProducts={productList.length} productPerPage={productPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div>
                </div>
            </div>
        </>
    </Helmet>
};

export default Product;