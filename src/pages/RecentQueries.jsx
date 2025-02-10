import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../hooks/useAxiosSecure';
import RecentQueriesCard from './RecentQueriesCard';
import { motion } from "framer-motion";
const RecentQueries = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        axiosSecure.get('/queries')
            .then(response => {
                
                setQueries(response.data); // Set sorted data to state
                // console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
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
      
    return (
        <div className='my-2 md:my-12'>
            <div data-aos="zoom-in" data-aos-duration="1500">

            <h2 className='text-2xl font-bold p-3'>Recent Queries</h2>
            </div>
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
