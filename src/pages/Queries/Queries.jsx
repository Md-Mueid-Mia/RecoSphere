// import React, { useEffect, useState } from 'react';
// import { axiosSecure } from '../../hooks/useAxiosSecure';
// import RecentQueriesCard from '../RecentQueriesCard';

// const Queries = () => {
//     const [queries, setQueries] = useState([]);
//     const [search, setSearch] = useState('');
//     const [gridLayout, setGridLayout] = useState(3); // Default to 3 columns

//     // Fetch queries whenever search term changes
//     useEffect(() => {
//         if (search.trim() === '') {
//             // If search is empty, you might want to fetch all queries
//             axiosSecure.get(`/queries`)
//                 .then(response => {
//                     setQueries(response.data); // Set sorted data to state
//                 })
//                 .catch(error => {
//                     console.error("Error fetching data:", error);
//                 });
//         } else {
//             // Fetch queries with the search term
//             axiosSecure.get(`/queries?search=${search}`)
//                 .then(response => {
//                     setQueries(response.data); // Set sorted data to state
//                 })
//                 .catch(error => {
//                     console.error("Error fetching data:", error);
//                 });
//         }
//     }, [search, axiosSecure]);  // Run effect when search term changes

//     // Function to handle grid layout change
//     const handleLayoutChange = (layout) => {
//         setGridLayout(layout);
//         // console.log(layout);
//     };

//     return (
//         <div className='my-12 px-6'>
//             <div className='flex gap-2 p-1 overflow-hidden items-center justify-center rounded-lg'>
//                 <input
//                     className='px-6 py-2 text-gray-700 placeholder-gray-500 w-5/12 border bg-white outline-none focus:placeholder-transparent rounded-md'
//                     type='text'
//                     name='search'
//                     onChange={(e) => setSearch(e.target.value)}  // Update search state on input change
//                     placeholder='Enter product Name'
//                     aria-label='Enter product Name'
//                 />
//                 <button
//                     className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-primary rounded-md hover:bg-primary focus:bg-primary focus:outline-none'
//                     onClick={() => setSearch(search)}  // Trigger search when button is clicked
//                 >
//                     Search
//                 </button>
//             </div>

//             {/* Layout Toggle Buttons */}
//             <div className="flex gap-4 my-4 justify-center">
//                 <button 
//                     onClick={() => handleLayoutChange(1)} 
//                     className={`px-4 py-2 text-sm font-medium ${gridLayout === 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
//                     1 Column
//                 </button>
//                 <button 
//                     onClick={() => handleLayoutChange(2)} 
//                     className={`px-4 py-2 text-sm font-medium ${gridLayout === 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
//                     2 Columns
//                 </button>
//                 <button 
//                     onClick={() => handleLayoutChange(3)} 
//                     className={`px-4 py-2 text-sm font-medium ${gridLayout === 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
//                     3 Columns
//                 </button>
//                 <button 
//                     onClick={() => handleLayoutChange(4)} 
//                     className={`px-4 py-2 text-sm font-medium ${gridLayout === 4 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
//                     4 Columns
//                 </button>
//             </div>

//             <h2 className='text-2xl font-bold'>All Queries</h2>

//             {/* Grid layout based on gridLayout state */}
//             <div className={`grid gap-4 ${gridLayout === 1 ? 'grid-cols-1' : gridLayout === 2 ? 'grid-cols-2' : gridLayout === 3 ? 'grid-cols-3 ': 'grid-cols-4'}`}>
//                 {queries.map((query, index) => (
//                     <RecentQueriesCard key={index} query={query} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Queries;

import { useTheme } from "../../provider/ThemeProvider";
import { motion } from "framer-motion";
import { FaSearch, FaThList, FaThLarge } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import RecentQueriesCard from "../RecentQueriesCard";

const Queries = () => {
    const [search, setSearch] = useState("");
    const [queries, setQueries] = useState([]);
    const [gridLayout, setGridLayout] = useState("grid");
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const axiosSecure = useAxiosSecure();

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
            }, [search, axiosSecure]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen py-20 px-4 md:px-6 ${
                theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'
            }`}
        >
            {/* Search Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <motion.div 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="flex flex-col md:flex-row gap-4 items-center"
                >
                    <div className={`relative flex-1 w-full ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg shadow-lg`}>
                        <input
                            type="text"
                            className={`w-full px-6 py-4 pl-12 ${
                                theme === 'dark' 
                                    ? 'bg-gray-800 text-white placeholder-gray-400' 
                                    : 'bg-white text-gray-800 placeholder-gray-500'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    
                    {/* View Toggle */}
                    <div className={`flex gap-2 p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg`}>
                        <button
                            onClick={() => setGridLayout("grid")}
                            className={`p-2 rounded ${
                                gridLayout === "grid" 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-500'
                            }`}
                        >
                            <FaThLarge size={20} />
                        </button>
                        <button
                            onClick={() => setGridLayout("list")}
                            className={`p-2 rounded ${
                                gridLayout === "list" 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-500'
                            }`}
                        >
                            <FaThList size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Results Section */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : queries.length > 0 ? (
                <motion.div 
                    layout
                    className={`grid gap-6 ${
                        gridLayout === "grid" 
                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
                            : 'grid-cols-2'
                    }`}
                >
                    {queries.map((query) => (
                        <RecentQueriesCard 
                            key={query._id} 
                            query={query} 
                            layout={gridLayout}
                        />
                    ))}
                </motion.div>
            ) : (
                <div className={`text-center py-12 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                    <p className="text-xl">No results found</p>
                    <p className="mt-2">Try searching for something else</p>
                </div>
            )}
        </motion.div>
    );
};

export default Queries;