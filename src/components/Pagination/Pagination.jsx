import React from 'react';

const Pagination = ({ productPerPage, totalProducts, setCurrentPage, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleChangePage = (page) => {
        setCurrentPage(page);
        window.scroll(0, 0)
    }
    return (
        <div className='pagination flex justify-center gap-4 mt-5'>
            {pageNumbers.map((page, index) => (
                <div key={index}
                    className={`${page === currentPage ? 'bg-pink text-white' : ''} cursor-pointer rounded-xl px-4 py-2`}
                    onClick={() => handleChangePage(page)}
                >
                    {page}
                </div>
            ))}
        </div>
    );
};

export default Pagination;