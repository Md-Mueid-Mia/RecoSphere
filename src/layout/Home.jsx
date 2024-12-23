import React from 'react';
import Carousel from './../components/Carousel';
import RecentQueries from '../pages/RecentQueries';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Carousel/>
            <RecentQueries/>
        </div>
    );
};

export default Home;