import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../hooks/useAxiosSecure';
import RecentQueriesCard from './RecentQueriesCard';

const RecentQueries = () => {
    const [queries, setQueries]= useState([])
    useEffect(()=>{
        axiosSecure.get('/queries')
        .then(response => {
            setQueries(response.data)
            console.log(response.data);
        })
        
    },[axiosSecure])

    const sortedQueries = queries.sort((a, b) => {
        const dateA = new Date(`${a.postDate}T${a.postTime}`);
        const dateB = new Date(`${b.postDate}T${b.postTime}`);
        return dateB - dateA; // Sort descending
      });
      console.log(sortedQueries);
    return (
        <div className='my-12'>
            <h2 className='text-2xl font-bold'>Recent Queries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                queries && queries.slice(0, 6).map((query, index) => <RecentQueriesCard key={index} query={query}/>)
            }
            </div>
        </div>
    );
};

export default RecentQueries;