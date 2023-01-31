import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = ({ title }) => {
    const location = useLocation();
    const breadCrumbView = () => {
        const { pathname } = location;
        const pathnames = pathname.split("/").filter((item) => item);
        const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        return (
            <div className="breadcrumb h-[400px] w-full relative">
                <div className="container mx-auto py-36 px-48 absolute lg:-top-16 xl:top-0 lg:left-10 xl:left-36">
                    <div className="text-white mb-6 text-7xl font-medium font-lobster capitalize">
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
        );
    };

    return <>{breadCrumbView()}</>;
}

export default BreadCrumb