import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = ({ title }) => {
    const location = useLocation();
    const breadCrumbView = () => {
        const { pathname } = location;
        const pathnames = pathname.split("/").filter((item) => item);
        const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        return (
            <div className="breadcrumb mt-20 overflow-hidden w-full">
                <div className="container mx-auto">
                    <div className='py-16 md:py-24 lg:py-28 xl:py-44 px-16 md:px-20 lg:px-40 xl:px-48'>
                        <div className="text-white mb-6 text-5xl md:text-7xl font-medium font-lobster capitalize">
                            <span>{title}</span>
                        </div>
                        <div>
                            {pathnames.length > 0 ? (
                                <Link to="/"
                                    className='text-white'
                                >Home {">"} </Link>
                            ) : (
                                <p className='text-white'>Home</p>
                            )}
                            {pathnames.map((name, index) => {
                                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                                const isLast = index === pathnames.length - 1;
                                return isLast ? (
                                    <span key={index} className="text-white">{capatilize(name)} </span>
                                ) : (
                                    <span key={index}>
                                        <Link to={`${routeTo}`} className="text-white">{capatilize(name)} {">"} </Link>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return <>{breadCrumbView()}</>;
}

export default BreadCrumb