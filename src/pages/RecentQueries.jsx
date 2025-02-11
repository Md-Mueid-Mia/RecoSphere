import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../hooks/useAxiosSecure';
import RecentQueriesCard from './RecentQueriesCard';
import { motion } from "framer-motion";
import Aos from 'aos';
const RecentQueries = () => {
    const [queries, setQueries] = useState([]);

        const [loading, setLoading] = useState(true);
        useEffect(() => {
          Aos.init();
      }, []);
        useEffect(() => {
            setLoading(true);
            axiosSecure.get('/queries')
                .then(response => {
                    setQueries(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => setLoading(false));
        }, [axiosSecure]);
    const staggerContainer = (staggerChildren, delayChildren) => {
        return {
          hidden: {},
          show: {
            transition: {
              staggerChildren: staggerChildren,
              delayChildren: delayChildren || 0,
            },
          },
        };
      };
            if (loading) {
          return  <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
      
      if (queries.length === 0) {
          return <div>No queries found</div>;
      }
    return (
        <div className='my-2 md:my-12'>
             <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className='text-2xl font-bold p-3'>Recent Queries</h2>
        </motion.div>
            <motion.div
  variants={staggerContainer()}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.25 }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
>
                {
                    queries.slice(0, 8).map((query, index) => (
                        <RecentQueriesCard key={index} query={query} index={index} />
                    ))
                }
            </motion.div>
        </div>
    );
};

export default RecentQueries;
