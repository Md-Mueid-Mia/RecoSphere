// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from '../firebase/Navbar';
// import Footer from '../components/Footer';
// import { Toaster } from 'react-hot-toast';

// const MainLayout = () => {
//     return (
//         <div className='max-w-7xl mx-auto overflow-hidden'>
//             <Navbar/>
//             <Outlet/>
//             <Footer/>
//             <Toaster />
//         </div>
//     );
// };

// export default MainLayout;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../firebase/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '../provider/ThemeProvider';

const MainLayout = () => {
    const { theme } = useTheme();
    
    return (
        <div className={`min-h-screen ${
            theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
        } transition-colors duration-200`}>
                <Navbar/>
            <div className='max-w-7xl mx-auto overflow-hidden'>
                <div>
                    <Outlet/>
                </div>
            </div>
                <Footer/>
                <Toaster />
        </div>
    );
};

export default MainLayout;