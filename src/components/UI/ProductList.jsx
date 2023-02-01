import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ data }) => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
            {data.map((product, index) => (
                <ProductCard
                    key={index}
                    item={product}
                />
            ))}
        </div>
    );
};

export default ProductList;