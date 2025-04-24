

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tilt } from "react-tilt";
import { useTheme } from "../provider/ThemeProvider"; // Assuming this is the correct path

const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

const RecentQueriesCard = ({ query, index = 0 }) => {
  const { theme } = useTheme();
  const {
    productImageUrl,
    productName,
    productBrand,
    queryTitle,
    recommendationCount,
    _id,
  } = query;

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="w-full px-4 md:px-0"
    >
      <Tilt
        options={{
          max: 25,
          scale: 1.05,
          speed: 450,
          glare: theme === 'dark',
          "max-glare": 0.3,
        }}
        className="w-full"
      >
        <div className={`
          w-full rounded-2xl p-5 
          transition-all duration-300 ease-in-out
          hover:shadow-xl transform hover:-translate-y-2
          ${theme === 'dark' 
            ? 'bg-gray-800 backdrop-blur-xl border border-gray-700' 
            : 'bg-white backdrop-blur-xl border border-gray-200'
          }
        `}>
          {/* Image Container */}
          <div className="relative h-[230px] w-full overflow-hidden rounded-xl">
            <img
              src={productImageUrl}
              alt={productName}
              className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-110"
            />
            <div className={`
              absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold
              ${theme === 'dark' 
                ? 'bg-gray-900/70 text-white' 
                : 'bg-white/70 text-gray-800'
              }
            `}>
              {recommendationCount} 🌟
            </div>
          </div>
          
          {/* Content */}
          <div className="mt-5 space-y-3">
            <h3 className={`
              text-xl md:text-2xl font-bold line-clamp-2
              ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
            `}>
              {productName.slice(0, 12)}{productName.length > 12 ? '...' : ''}
            </h3>
            <p className={`
              text-sm md:text-base font-medium
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            `}>
              {productBrand}
            </p>
            <p className={`
              text-sm md:text-base line-clamp-2
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
            `}>
              {queryTitle}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <Link 
              to={`/queryDetails/${_id}`}
              className={`
                w-full px-6 py-3 rounded-xl font-medium text-center 
                transition-all duration-300 flex items-center justify-center gap-2
                ${theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                }
              `}
            >
              <span>Recommendation</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default RecentQueriesCard;