import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../hooks/useAxiosSecure';
import RecentQueriesCard from './RecentQueriesCard';

const RecentQueries = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        axiosSecure.get('/queries')
            .then(response => {
                // // Sort the queries after fetching the data
                // const sortedData = response.data.sort((a, b) => {
                //     const dateA = new Date(`${a.postDate}T${a.postTime}`);
                //     const dateB = new Date(`${b.postDate}T${b.postTime}`);
                //     return  dateA - dateB; // Sort descending
                // });
                setQueries(response.data); // Set sorted data to state
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [axiosSecure]);

    return (
        <div className='my-12'>
            <h2 className='text-2xl font-bold'>Recent Queries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    queries.slice(0, 6).map((query, index) => (
                        <RecentQueriesCard key={index} query={query} />
                    ))
                }
            </div>
        </div>
    );
};

export default RecentQueries;
