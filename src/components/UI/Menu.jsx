import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import SectionTitle from '../common/SectionTitle/SectionTitle';
import { db } from '../../firebase';
import {
    collection,
    onSnapshot,
} from "firebase/firestore";

const Menu = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 1500,
        slidesToShow: 5,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                }
            }
        ]
    }

    const [menus, setMenus] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "menu"), (snapShot) => {
            let menu = [];
            try {
                snapShot.docs.forEach((doc) =>
                    menu.push({ id: doc.id, ...doc.data() })
                );
                setMenus(menu);
            } catch (error) {
                console.log(error);
            }
        });

        return () => unsub();
    }, [])

    return (
        <div className='menu bg-background pt-2 lg:pt-8 pb-10'>
            <div className='container m-auto'>
                <div className='-mt-14'>
                    <SectionTitle name='Menu' className='!text-3xl' />
                </div>
                <Slider {...settings}>
                    {menus.map(item => (
                        <div className='flex justify-center items-center px-1 py-3 rounded-xl w-36 bg-background' key={item.id}>
                            <img className='w-12 h-12 object-cover m-auto' src={item.imgMenu} alt={item.title} />
                            <p className='text-center font-bold mt-2 !text-black'>{item.title}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Menu;