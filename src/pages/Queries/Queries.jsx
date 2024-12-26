import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import RecentQueriesCard from '../RecentQueriesCard';

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [search, setSearch] = useState('');
    const [gridLayout, setGridLayout] = useState(3); // Default to 3 columns

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

    // Function to handle grid layout change
    const handleLayoutChange = (layout) => {
        setGridLayout(layout);
        // console.log(layout);
    };

    return (
        <div className='my-12 px-6'>
            <div className='flex gap-2 p-1 overflow-hidden items-center justify-center rounded-lg'>
                <input
                    className='px-6 py-2 text-gray-700 placeholder-gray-500 w-5/12 border bg-white outline-none focus:placeholder-transparent rounded-md'
                    type='text'
                    name='search'
                    onChange={(e) => setSearch(e.target.value)}  // Update search state on input change
                    placeholder='Enter product Name'
                    aria-label='Enter product Name'
                />
                <button
                    className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-primary rounded-md hover:bg-primary focus:bg-primary focus:outline-none'
                    onClick={() => setSearch(search)}  // Trigger search when button is clicked
                >
                    Search
                </button>
            </div>

            {/* Layout Toggle Buttons */}
            <div className="flex gap-4 my-4 justify-center">
                <button 
                    onClick={() => handleLayoutChange(1)} 
                    className={`px-4 py-2 text-sm font-medium ${gridLayout === 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    1 Column
                </button>
                <button 
                    onClick={() => handleLayoutChange(2)} 
                    className={`px-4 py-2 text-sm font-medium ${gridLayout === 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    2 Columns
                </button>
                <button 
                    onClick={() => handleLayoutChange(3)} 
                    className={`px-4 py-2 text-sm font-medium ${gridLayout === 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    3 Columns
                </button>
            </div>

            <h2 className='text-2xl font-bold'>All Queries</h2>

            {/* Grid layout based on gridLayout state */}
            <div className={`grid gap-4 ${gridLayout === 1 ? 'grid-cols-1' : gridLayout === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {queries.map((query, index) => (
                    <RecentQueriesCard key={index} query={query} />
                ))}
            </div>
        </div>
    );
};

export default Queries;
