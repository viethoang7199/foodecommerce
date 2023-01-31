import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import Routers from '../../routes/Routers';
import { userSlice } from '../../store/Slice/userSlice';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Loading from '../UI/Loading';
import { useLocation } from 'react-router-dom';

const Layout = () => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
    }, []);

    const handleLogout = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            dispatch(
                userSlice.actions.SET_USER({ user: null })
            );
        });
        setTimeout(() => {
            setIsLoading(false)
            toast.success('Logged in successfully!');
            localStorage.clear();
            navigate('/login')
        }, 2000);
    };

    return (
        <>
            {
                location.pathname.startsWith('/admin') ? '' : <Header
                    user={user}
                    onHandleLogout={handleLogout}
                />
            }

            {isLoading && <Loading />} <Routers />

            {
                location.pathname.startsWith('/admin') ? '' : <Footer />
            }
        </>
    );
};

export default Layout;