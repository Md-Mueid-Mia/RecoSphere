import React from 'react';
import Carousel from './../components/Carousel';
import RecentQueries from '../pages/RecentQueries';
import ContactForm from '../components/ContactForm ';
import FAQ from '../components/FAQ';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Carousel/>
            <RecentQueries/>
            <FAQ/>
            <ContactForm/>
        </div>
    );
};

export default Home;