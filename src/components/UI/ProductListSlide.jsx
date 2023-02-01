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
        slidesToShow: 5,
        swipeToSlide: true,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
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