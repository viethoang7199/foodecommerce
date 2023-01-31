import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Hero = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        speed: 3000,
        lazy: true,
    };
    return (
        <div className='hero bg-background pt-20'>
            <Slider {...settings}>
                <div className="relative outline-none">
                    <img
                        className="w-full h-auto lg:h-[600px] xl:h-[750px]"
                        src='https://firebasestorage.googleapis.com/v0/b/food-cb709.appspot.com/o/Images%2Fhero%2Fhero-bg%2Fhero_bg_1.png?alt=media&token=83e8a5c7-1db1-4411-b35b-d4c48605155f'
                        alt='heroBg'
                    />
                    <img
                        className='w-24 sm:w-56 lg:w-[300px] xl:w-[470px] absolute top-6 sm:top-2 xl:top-0 left-4 xl:left-16 animate-wiggle'
                        src="https://firebasestorage.googleapis.com/v0/b/food-cb709.appspot.com/o/Images%2Fhero%2Fhero-text%2Fhero_text_1.png?alt=media&token=0f66e867-9a15-430a-b7e9-36cbd3cca1da"
                        alt="hero-text"
                    />
                    <img
                        className='w-12 sm:w-24 lg:w-[126px] absolute bottom-10 sm:bottom-20 lg:bottom-36 xl:bottom-52 left-28 sm:left-56 lg:left-[350px] xl:left-[580px]'
                        src="https://firebasestorage.googleapis.com/v0/b/food-cb709.appspot.com/o/Images%2Fhero%2Fhero-curve-line%2Fcurve_line_1.png?alt=media&token=3825b909-ee04-4028-ab30-de66a4261bed"
                        alt="hero-curve"

                    />
                    <Link to='/shop'>
                        <img
                            className='w-12 sm:w-[70px] lg:w-[100px] absolute z-10 bottom-5 sm:bottom-10 lg:bottom-20 xl:bottom-32 left-20 sm:left-44 lg:left-72 xl:left-[520px] animate-button'
                            src="https://firebasestorage.googleapis.com/v0/b/food-cb709.appspot.com/o/Images%2Fhero%2Fhero-button%2Fbutton_1.png?alt=media&token=efa0b1f6-e41d-44f0-b7c6-835fc2ab7663"
                            alt="hero-btn"
                        />
                    </Link>

                </div>
                <div className="relative outline-none">
                    <img
                        className="w-full h-auto lg:h-[600px] xl:h-[750px]"
                        src='https://firebasestorage.googleapis.com/v0/b/food-cb709.appspot.com/o/Images%2Fhero%2Fhero-bg%2Fhero_bg_3.png?alt=media&token=4560fa8b-0b01-487f-85fb-116dd91ea763'
                        alt='heroBg'
                    />
                    <img
                        className='w-24 sm:w-48 lg:w-[300px] xl:w-[543px] absolute top-16 sm:top-24 lg:top-32 right-10 sm:right-20 lg:right-40'
                        src="https://firebasestorage.googleapis.com/v0/b/food-cb709.appspot.com/o/Images%2Fhero%2Fhero-text%2Fhero_text_3.png?alt=media&token=a390a81f-cc72-43e0-ad6c-2eb766586b2a"
                        alt="hero-text"
                    />
                    <img
                        className='w-28 sm:w-[220px] lg:w-[330px] xl:w-[600px] absolute top-14 sm:top-[90px] lg:top-[120px] xl:top-32 right-7 sm:right-[60px] lg:right-[130px] xl:right-28 animate-ping'
                        src="https://firebasestorage.googleapis.com/v0/b/food-cb709.appspot.com/o/Images%2Fhero%2Fhero-shape%2Fhero_shape_1.png?alt=media&token=caa37226-26c9-413c-b7db-3841af93b07e"
                        alt="hero-shape"
                    />
                    <img
                        className='w-12 sm:w-24 lg:w-[126px] absolute bottom-12 sm:bottom-20 lg:bottom-40 right-36 sm:right-[280px] lg:right-[470px] xl:right-[730px]'
                        src="https://firebasestorage.googleapis.com/v0/b/food-cb709.appspot.com/o/Images%2Fhero%2Fhero-curve-line%2Fcurve_line_2.png?alt=media&token=e69afb72-39bf-4bce-913b-3d6a2d23902a"
                        alt="hero-curve"
                    />
                    <Link to='/shop'>
                        <img
                            className='w-12 sm:w-[70px] lg:w-[100px] absolute bottom-5 sm:bottom-10 lg:bottom-24 right-28 sm:right-[240px] lg:right-[400px] xl:right-[650px] animate-button'
                            src="https://firebasestorage.googleapis.com/v0/b/food-cb709.appspot.com/o/Images%2Fhero%2Fhero-button%2Fbutton_2.png?alt=media&token=320290ac-826d-46de-812b-4a296e57dd42"
                            alt="hero-btn"
                        />
                    </Link>
                </div>
            </Slider>
        </div>
    );
};

export default Hero;
