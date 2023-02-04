import React, { useEffect, useState } from 'react';
import ButtonCommon from '../ButtonCommon/ButtonCommon';
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const BackToTop = () => {
    const [backTop, setBackTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 500) {
                setBackTop(true)
            } else {
                setBackTop(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)

        }
    }, [])

    const handleBackTop = () => {
        window.scroll(0, 0)
    }
    return (
        <>
            {backTop && (
                <div className='backTop fixed bottom-14 z-40 right-12'>
                    <ButtonCommon
                        name={<BsFillArrowUpCircleFill />}
                        onClick={handleBackTop}
                    />
                </div>
            )}
        </>
    );
};

export default BackToTop;