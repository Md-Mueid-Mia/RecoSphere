import React from 'react';
import Carousel from './../components/Carousel';
import RecentQueries from '../pages/RecentQueries';
import ContactForm from '../components/ContactForm ';
import FAQ from '../components/FAQ';
import Promotional from '../components/Promotional';
import Services from '../pages/services/Services';
import Reviews from '../components/Reviwes';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Carousel/>
            <RecentQueries/>
            <Promotional/>
            <Services/>
            <Reviews/>
            <FAQ/>
            <ContactForm/>
        </div>
    );
};

export default Home;