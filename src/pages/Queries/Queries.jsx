import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import RecentQueriesCard from '../RecentQueriesCard';

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [search, setSearch] = useState('');

    // Fetch queries whenever search term changes
    useEffect(() => {
        if (search.trim() === '') {
            // If search is empty, you might want to fetch all queries
            axiosSecure.get(`/queries`)
                .then(response => {
                    setQueries(response.data); // Set sorted data to state
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        } else {
            // Fetch queries with the search term
            axiosSecure.get(`/queries?search=${search}`)
                .then(response => {
                    setQueries(response.data); // Set sorted data to state
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [search, axiosSecure]);  // Run effect when search term changes

    return (
        <div className='my-12'>
            <div className='flex gap-2 p-1 overflow-hidden items-center justify-center rounded-lg'>
                <input
                    className='px-6 py-2 text-gray-700 placeholder-gray-500 w-5/12 border bg-white outline-none focus:placeholder-transparent'
                    type='text'
                    name='search'
                    onChange={(e) => setSearch(e.target.value)}  // Update search state on input change
                    placeholder='Enter Job Title'
                    aria-label='Enter Job Title'
                />
                <button
                    className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                    onClick={() => setSearch(search)}  // Trigger search when button is clicked
                >
                    Search
                </button>
            </div>
            <h2 className='text-2xl font-bold'>All Queries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {queries.map((query, index) => (
                    <RecentQueriesCard key={index} query={query} />
                ))}
            </div>
        </div>
    );
};

export default Queries;
