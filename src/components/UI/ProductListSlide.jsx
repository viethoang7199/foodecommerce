import React from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';

const ProductListSlide = ({ data }) => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1500,
        slidesToShow: 3,
        swipeToSlide: true,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                }
            }
        ]
    }
    return (
        <div className='product__list__slide container m-auto'>
            <Slider {...settings}>
                {data.map(product => (
                    <ProductCard
                        key={product.id}
                        item={product}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default ProductListSlide;