import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineDown, AiOutlineFunnelPlot } from 'react-icons/ai';
import BackToTop from '../components/common/BackToTop/BackToTop';
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb';
import ButtonCommon from '../components/common/ButtonCommon/ButtonCommon';
import InputText from '../components/common/InputText/InputText';
import Overlay from '../components/common/Overlay/Overlay';
import Pagination from '../components/Pagination/Pagination';
import Helmet from '../components/UI/Helmet';
import ProductList from '../components/UI/ProductList';
import useGetData from '../CustomHook/useGetData';
import { db } from "../firebase";

const sortOptions = [
    { name: 'Name: A to Z', type: 'nameAz' },
    { name: 'Name: Z to A', type: 'nameZa' },
    { name: 'Price: Low to High', type: 'priceLowest' },
    { name: 'Price: High to Low', type: 'priceHighest' },
]

const subCategories = [
    { name: 'All', type: 'all' },
    { name: 'Pizza', type: 'pizza' },
    { name: 'Hamburger', type: 'hamburger' },
    { name: 'Salad', type: 'salad' },
    { name: 'Spaghetti', type: 'spaghetti' },
]

const Product = () => {

    const { data: products } = useGetData('products')
    const productsData = products
    const [productList, setProductList] = useState(productsData);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [sortDisplay, setSortDisplay] = useState(false);
    const [filterByCategory, setFilterByCategory] = useState('all');
    const [sortProducts, setSortProducts] = useState('')
    const [priceRange, setPriceRange] = useState(0)


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
        if (filterByCategory === 'all') {
            setProductList(productsData);
        }
        if (filterByCategory === 'pizza') {
            const filtered = productsData.filter(item => item.category === 'pizza')
            setProductList(filtered)
        }
        if (filterByCategory === 'hamburger') {
            const filtered = productsData.filter(item => item.category === 'hamburger')
            setProductList(filtered)
        }
        if (filterByCategory === 'salad') {
            const filtered = productsData.filter(item => item.category === 'salad')
            setProductList(filtered)
        }
        if (filterByCategory === 'spaghetti') {
            const filtered = productsData.filter(item => item.category === 'spaghetti')
            setProductList(filtered)
        }
        if (filterByCategory === 'drink') {
            const filtered = productsData.filter(item => item.category === 'drink')
            setProductList(filtered)
        }

        if (sortProducts === 'nameAz') {
            const nameAz = [...productsData].sort((a, b) =>
                a.productName.toLowerCase() > b.productName.toLowerCase() ? 1 : -1,
            );
            setProductList(nameAz)
        }
        if (sortProducts === 'nameZa') {
            const nameZa = [...productsData].sort((a, b) =>
                a.productName.toLowerCase() > b.productName.toLowerCase() ? -1 : 1,
            );
            setProductList(nameZa)
        }
        if (sortProducts === 'priceLowest') {
            const priceLowest = [...productsData].sort((a, b) => a.price - b.price);
            setProductList(priceLowest)
        }
        if (sortProducts === 'priceHighest') {
            const priceHighest = [...productsData].sort((a, b) => b.price - a.price);
            setProductList(priceHighest)
        }
    }, [filterByCategory, sortProducts, productsData])

    useEffect(() => {
        if (priceRange === 0) {
            setProductList(productsData)
        } else {
            const filteredPrice = productsData.filter(item => item.price >= Math.max(priceRange))
            setProductList(filteredPrice)
        }

    }, [priceRange, productsData])

    mobileFiltersOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = 'auto';


    const handleChangeFilterPrice = (e) => {
        setPriceRange(e.target.value)
    }

    const handleSearchProducts = (e) => {
        const searchProduct = e.target.value;
        const searchedProduct = productsData.filter(item => item.productName?.toLowerCase().includes(searchProduct?.toLowerCase()) || item.category?.toLowerCase().includes(searchProduct?.toLowerCase()))
        setProductList(searchedProduct)
    }

    const handleClearFilter = (e) => {
        e.preventDefault();
        setFilterByCategory('all')
        setPriceRange(0)
        setProductList(productsData)
    }

    return (
        <Helmet title='Shop'>
            <BackToTop />
            <BreadCrumb title='Shop' />
            <div className="bg-white">
                <div>
                    <Overlay
                        className={mobileFiltersOpen ? 'block' : 'hidden'}
                        onClick={() => setMobileFiltersOpen(false)}
                    />
                </div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-col md:flex-row gap-5 mt-16 py-6 shadow-xl px-4">
                        <div className='font-medium text-lg'>
                            {/* Showing {currentPage} - {productPerPage} of {productsData.length} products */}
                            {productList.length} Products Available
                        </div>
                        <div className='grow lg:mx-24 mx-16'>
                            <InputText
                                type='search'
                                className='border !border-gray-400 rounded-md py-1 px-4 w-full'
                                placeholder='Search...'
                                onChange={handleSearchProducts}
                            />
                        </div>

                        <div className="flex items-center">
                            <div className="relative inline-block text-left">
                                <div className="inline-flex justify-center items-center px-4 text-lg font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                                    onClick={() => setSortDisplay(!sortDisplay)}
                                >
                                    <span>Sort</span>
                                    <span>
                                        <AiOutlineDown
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                                <ul className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-gray-200 shadow-2xl ">
                                    {sortOptions.map((item, index) => (
                                        <li
                                            key={index}
                                            className={`px-4 py-3 min-w-max ${sortDisplay ? 'block' : 'hidden'}`}
                                            onClick={() => {
                                                setSortProducts(item.type)
                                                setSortDisplay(false)
                                            }}
                                        >
                                            <span className='cursor-pointer'>{item.name}</span>
                                            <hr className='border-gray-400' />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <ButtonCommon
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden !bg-transparent"
                                onClick={() => setMobileFiltersOpen(true)}
                                name={<AiOutlineFunnelPlot className='h-5 w-5' />}
                            />
                        </div>
                    </div>
                    <hr />
                    <section className="pt-6 pb-24">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className={`p-4 lg:col-span-1 fixed lg:relative top-0 right-0 z-50 lg:z-0 w-3/4 lg:w-full h-full lg:h-full shadow-xl translate-x-full lg:translate-x-0 bg-white transition-all duration-500 ease-in-out ${mobileFiltersOpen ? '!translate-x-0 overflow-y-auto transition-all duration-500 ease-in-out' : ''}`}>
                                <div className='flex justify-between items-center lg:hidden'>
                                    <h3 className='text-2xl p-4 text-gray-500'>Filter</h3>
                                    <AiOutlineClose
                                        className="h-6 w-6 mx-4 text-gray-500"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    />
                                </div>
                                <hr className='block lg:hidden' />
                                <h3 className="text-2xl font-medium pt-8 pb-2 px-4">Categories</h3>
                                <ul className="border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {subCategories.map((item, index) => (
                                        <li
                                            key={index}
                                            className={`px-4 py-2 mx-4 cursor-pointer hover:shadow-xl hover:font-semibold rounded-lg transition-all duration-300 ease-in-out ${filterByCategory === item.type ? "bg-pink text-white shadow-xl" : ""}`}
                                            onClick={() => {
                                                setFilterByCategory(item.type)
                                                setMobileFiltersOpen(false)
                                            }}
                                        >
                                            <span className='text-lg'>{item.name}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className='mb-5'>
                                    <h3 className="text-2xl font-medium pt-8 pb-2 px-4">Price</h3>
                                    <div className='flex items-center justify-between'>
                                        <div className='px-4 text-pink font-semibold'>
                                            ${priceRange}
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        max={100}
                                        // min={0}
                                        value={priceRange}
                                        onChange={handleChangeFilterPrice}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300"
                                    />
                                </div>
                                <hr />
                                <div className='text-center mt-5'>
                                    <ButtonCommon
                                        onClick={handleClearFilter}
                                        name='Clear filter'
                                    />
                                </div>
                            </form>


                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {/* Replace with your content */}
                                {currentProduct.length > 0
                                    ?
                                    <ProductList data={currentProduct} />
                                    :
                                    <p className='text-2xl !text-black text-center'>No products are found!</p>}
                                <Pagination totalProducts={productList.length} productPerPage={productPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                                {/* /End replace */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </Helmet>
    )
}

export default Product