import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosSecure } from "../hooks/useAxiosSecure";
import AuthContext from "../provider/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useTheme } from "../provider/ThemeProvider";
const QueryDetails = ({ queryId, currentUser }) => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [formData, setFormData] = useState({
    recommendationTitle: "",
    recommendedProductName: "",
    recommendedProductImage: "",
    recommendationReason: "",
  });
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const navigate = useNavigate();
  const {theme} = useTheme();
  // console.log(id);
  const {
    UserName,
    boycottReason,
    email,
    photo,
    postDate,
    postTime,
    productBrand,
    productImageUrl,
    productName,
    queryTitle,
    recommendationCount,
    recommendation,
    _id,
  } = query || {};

  const timestamp = Date.now();
  const currentDate = new Date(timestamp);

  const postedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  const hours12 = currentDate.getHours() % 12 || 12;
  const period = currentDate.getHours() >= 12 ? "PM" : "AM";
  const PostedTime = `${hours12.toString().padStart(2, "0")}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${currentDate
    .getSeconds()
    .toString()
    .padStart(2, "0")} ${period}`;

  useEffect(() => {
    if (_id) {
      fetchAllRecommendations();
    }
  }, [_id]);

  const fetchAllRecommendations = async () => {
    try {
      const { data } = await axiosSecure.get(`/recommendation?queryId=${_id}`);
      if (data && data.length > 0) {
        setRecommendations(data); // Update recommendations state
      } else {
        // console.log("No recommendations found.");
        setRecommendations([]); // Handle empty state if needed
      }
    } catch (error) {
      setError("Error fetching recommendations.");
      console.error("Error fetching recommendations:", error);
    }
  };

  // console.log(recommendations, _id);
  useEffect(() => {
    if (id) {
      getSingleData();
    } else {
      console.error("Invalid query ID");
    }
  }, [id]);

  const getSingleData = async () => {
    try {
      const { data } = await axiosSecure.get(`/query/${id}`);
      setQuery(data);
    } catch (error) {
      console.error("Error fetching query data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === user?.email) {
      toast.error("You cannot recommend this product to yourself.");
      return; // Exit early to prevent the recommendation submission
    }

    const newRecommendation = {
      queryId: _id,
      queryTitle,
      productName,
      email,
      UserName,
      recommenderEmail: user?.email,
      recommenderName: user?.displayName,
      postedDate,
      PostedTime,
      ...formData,
    };
    try {
      const { data } = await axiosSecure.post(
        `/recommendation`,
        newRecommendation
      );

      if (data?.insertedId) {
        toast.success("Recommendation added successfully");

        await fetchAllRecommendations();
        await getSingleData();
        setFormData({
          recommendationTitle: "",
          recommendedProductName: "",
          recommendedProductImage: "",
          recommendationReason: "",
        });
      }
    } catch (error) {
      console.error("Error adding recommendation:", error);
      toast.error("Failed to add recommendation");
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${theme ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl shadow-xl overflow-hidden mb-12 ${
            theme ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={productImageUrl}
                alt={productName}
                className="w-full h-[400px] object-cover"
              />
              <div className={`absolute bottom-0 left-0 right-0 p-4 ${
                theme ? 'bg-black/60' : 'bg-white/60'
              } backdrop-blur-sm`}>
                <h2 className={`text-2xl font-bold ${
                  theme ? 'text-white' : 'text-gray-800'
                }`}>{productName}</h2>
              </div>
            </motion.div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${
                theme ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  theme ? 'text-white' : 'text-gray-800'
                }`}>{queryTitle}</h3>
                
                {/* User Info Card */}
                <div className={`flex items-center gap-4 p-4 rounded-lg ${
                  theme ? 'bg-gray-800' : 'bg-white'
                }`}>
                  {photo ? (
                    <img
                      src={photo}
                      alt={UserName}
                      className="w-16 h-16 rounded-full ring-2 ring-blue-500"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      theme ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {UserName?.[0] || 'N/A'}
                    </div>
                  )}
                  <div>
                    <div className={`font-bold ${
                      theme ? 'text-white' : 'text-gray-800'
                    }`}>{UserName}</div>
                    <div className={`text-sm ${
                      theme ? 'text-gray-400' : 'text-gray-500'
                    }`}>{email}</div>
                    <div className={`text-sm ${
                      theme ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {postDate} • {postTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations Section */}
        <div className="mb-12">
          <h3 className={`text-2xl font-bold mb-6 ${
            theme ? 'text-white' : 'text-gray-800'
          }`}>
            Recommendations ({recommendations.length || 0})
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <motion.div
                  key={rec._id}
                  whileHover={{ y: -5 }}
                  className={`rounded-xl overflow-hidden ${
                    theme ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg`}
                >
                  <img
                    src={rec.recommendedProductImage}
                    alt={rec.recommendedProductName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-3">
                    <h4 className={`text-lg font-semibold ${
                      theme ? 'text-white' : 'text-gray-800'
                    }`}>{rec.recommendationTitle}</h4>
                    <p className={`text-sm ${
                      theme ? 'text-gray-300' : 'text-gray-600'
                    }`}>{rec.recommendationReason}</p>
                    <div className={`text-xs ${
                      theme ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      By {rec.recommenderName} • {rec.postedDate}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className={`col-span-full text-center py-8 ${
                theme ? 'text-gray-400' : 'text-gray-600'
              }`}>
                No recommendations yet. Be the first to recommend!
              </p>
            )}
          </div>
        </div>
        
        {/* Add Recommendation Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className={`rounded-xl p-8 shadow-xl ${
            theme ? 'bg-gray-800/50 backdrop-blur' : 'bg-white'
          }`}
        >
          <h3 className={`text-3xl font-bold mb-8 ${
            theme ? 'text-white' : 'text-gray-800'
          }`}>Add a Recommendation</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Recommendation Title
                </label>
                <input
                  type="text"
                  name="recommendationTitle"
                  value={formData.recommendationTitle}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-300 ${
                    theme 
                      ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="Enter title"
                  required
                />
              </div>
        
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Product Name
                </label>
                <input
                  type="text"
                  name="recommendedProductName"
                  value={formData.recommendedProductName}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-300 ${
                    theme 
                      ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="Enter product name"
                  required
                />
              </div>
        
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Product Image URL
                </label>
                <input
                  type="url"
                  name="recommendedProductImage"
                  value={formData.recommendedProductImage}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-300 ${
                    theme 
                      ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>
        
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Recommendation Reason
                </label>
                <textarea
                  name="recommendationReason"
                  value={formData.recommendationReason}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-300 min-h-[200px] ${
                    theme 
                      ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="Why do you recommend this product?"
                  required
                />
              </div>
        
              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  theme
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } transform hover:scale-[1.02]`}
              >
                Submit Recommendation
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default QueryDetails;
