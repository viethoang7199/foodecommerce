import React from 'react';
import { ImSpinner10 } from 'react-icons/im';
import ReactDOM from 'react-dom';
const Loading = () => {
    return ReactDOM.createPortal(
        <div className='fixed w-screen h-screen bg-bg-rgba z-[100]'>
            <div className='fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-[999]'>
                <ImSpinner10 className='text-7xl text-pink animate-spin' />
            </div>
        </div>,
        document.getElementById('loading')
    );
};

export default Loading;