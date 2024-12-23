import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../firebase/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto overflow-hidden'>
            <Navbar/>
            <Outlet/>
            <Footer/>
            <Toaster />
        </div>
    );
};

export default MainLayout;