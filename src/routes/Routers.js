import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../components/UI/ForgotPassword';
import ProductDetail from '../components/UI/ProductDetail';
import ResetPassword from '../components/UI/ResetPassword';
import UpdateProfile from '../components/UI/UpdateProfile';
import AboutUs from '../pages/AboutUs';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Product from '../pages/Product';
import SignUp from '../pages/SignUp';
import Test from '../pages/Test';
import ProtectedRouter from './ProtectedRouter';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Product />} />
            <Route path='/shop/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/checkout' element={<ProtectedRouter>
                <Checkout />
            </ProtectedRouter>} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/update-profile' element={<UpdateProfile />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/test' element={<Test />} />
        </Routes>
    );
};

export default Routers;