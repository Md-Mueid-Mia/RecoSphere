import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";
import AuthContext from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../provider/ThemeProvider";

const RecommendationsForMe = () => {
  const axiosSecure = useAxiosSecure();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  useEffect(() => {
    if (user?.email) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/recommendationForMe/${user?.email}`);
      setRecommendations(response?.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecommendations = recommendations.filter(rec => 
    rec.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
console.log(recommendations);
  return (
    <div className={`min-h-screen py-8 px-4 md:pt-32 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Your Personalized Recommendations
          </h1>
          <p className="text-lg opacity-80">
            Discover products tailored just for you
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-md`}>
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search recommendations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg outline-none ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg ${view === 'grid' ? 'bg-blue-500 text-white' : ''}`}
            >
              <FiGrid size={20} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg ${view === 'list' ? 'bg-blue-500 text-white' : ''}`}
            >
              <FiList size={20} />
            </button>
          </div>
        </div>

        {/* Recommendations Grid */}
        {filteredRecommendations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <img
              src="/empty-state.svg"
              alt="No recommendations"
              className="w-48 mx-auto mb-6 opacity-50"
            />
            <h3 className="text-xl font-semibold mb-2">No recommendations found</h3>
            <p className="opacity-70">Try adjusting your search criteria</p>
          </motion.div>
        ) : (
          <div className={`grid ${
            view === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          } gap-6`}>
            {filteredRecommendations.map((rec, index) => (
              <motion.div
                key={rec._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-6 rounded-lg shadow-lg ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } transition-all duration-300`}
              >
                <div className="flex gap-4">
                  <img
                    src={rec?.recommendedProductImage || '/default-product.png'}
                    alt={rec?.productName}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{rec.productName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      theme === 'dark' 
                        ? 'bg-blue-900 text-blue-300' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {rec.category}
                    </span>
                    <p className={`mt-3 text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {rec.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsForMe;