import React from 'react';
import Slider from 'react-slick';
import { feedbackData } from '../../assets/fake-data/feedbackData';

const Feedback = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear",
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
        <div className='feedback pt-14 m-auto'>
            <div className='container m-auto'>
                <Slider {...settings} >
                    {feedbackData.map(item => (
                        <div
                            key={item.id}
                            className='bg-white shadow-lg py-4 md:py-10 px-4 md:px-10 rounded-3xl'>
                            <p className='mb-4 !text-black text-lg'>"&nbsp;{item.content}&nbsp;"</p>
                            <div className="flex justify-between items-center">
                                <img className='rounded-full w-14 h-14 object-cover mr-6' src={item.image} alt={item.author} />
                                <h3 className='text-xl font-lobster font-blod grow'>{item.author}</h3>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Feedback;