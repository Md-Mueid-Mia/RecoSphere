


import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import AuthContext from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FiImage, FiUpload, FiAlertCircle } from "react-icons/fi";
import { useTheme } from "../../provider/ThemeProvider";

const AddQueries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productImageUrl: "",
    queryTitle: "",
    boycottReason: "",
  });

  const timestamp = Date.now();
  const currentDate = new Date(timestamp);
  const postedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  const hours12 = currentDate.getHours() % 12 || 12;
  const period = currentDate.getHours() >= 12 ? "PM" : "AM";
  const PostedTime = `${hours12.toString().padStart(2, "0")}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${currentDate.getSeconds().toString().padStart(2, "0")} ${period}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'productImageUrl' && value) {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const queryData = {
        ...formData,
        UserName: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        recommendationCount: count,
        postedDate,
        PostedTime
      };

      const response = await axiosSecure.post('/query', queryData);
      if (response.data) {
        toast.success('Query added successfully!');
        setFormData({
          productName: "",
          productBrand: "",
          productImageUrl: "",
          queryTitle: "",
          boycottReason: "",
        });
        setImagePreview(null);
      }
    } catch (error) {
      toast.error('Failed to add query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={` py-10 px-4 md:pt-32 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Submit Your Query
          </h1>
          <p className="text-lg opacity-80">
            Share your concerns about products and brands
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg outline-none ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } border border-gray-300`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <input
                  type="text"
                  name="productBrand"
                  value={formData.productBrand}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg outline-none ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } border border-gray-300`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  name="productImageUrl"
                  value={formData.productImageUrl}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg outline-none ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } border border-gray-300`}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Query Title</label>
                <input
                  type="text"
                  name="queryTitle"
                  value={formData.queryTitle}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg outline-none ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } border border-gray-300`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Reason for Boycott</label>
                <textarea
                  name="boycottReason"
                  value={formData.boycottReason}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full p-3 rounded-lg outline-none ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } border border-gray-300`}
                  required
                ></textarea>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`
                px-8 py-3 rounded-lg font-medium text-white
                ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-purple-600'}
                transform hover:scale-105 transition-transform duration-200
              `}
            >
              {loading ? 'Submitting...' : 'Submit Query'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddQueries;