import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../firebase/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto overscroll-none'>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;