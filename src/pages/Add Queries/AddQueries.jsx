import React, { useContext, useState } from "react";
import AuthContext from "../../provider/AuthContext";

const AddQueries = () => {
  const { user } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productImageUrl: "",
    queryTitle: "",
    boycottReason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const UserName = user?.displayName;
    const email = user?.email;
    const photo = user?.photoURL;
    const recommendationCount = count;

    setFormData({
      ...formData,
      [name]: value,
      UserName,
      email,
      photo,
      recommendationCount
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Query Submitted:", formData);
    // Reset form
    setFormData({
      productName: "",
      productBrand: "",
      productImageUrl: "",
      queryTitle: "",
      boycottReason: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      <h2 className="text-2xl font-bold mb-6">Add Your Product Query</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-lg font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Product Brand */}
          <div>
            <label
              htmlFor="productBrand"
              className="block text-lg font-medium text-gray-700"
            >
              Product Brand
            </label>
            <input
              type="text"
              id="productBrand"
              name="productBrand"
              value={formData.productBrand}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Product Image URL */}
          <div>
            <label
              htmlFor="productImageUrl"
              className="block text-lg font-medium text-gray-700"
            >
              Product Image URL
            </label>
            <input
              type="url"
              id="productImageUrl"
              name="productImageUrl"
              value={formData.productImageUrl}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Query Title */}
          <div>
            <label
              htmlFor="queryTitle"
              className="block text-lg font-medium text-gray-700"
            >
              Query Title
            </label>
            <input
              type="text"
              id="queryTitle"
              name="queryTitle"
              value={formData.queryTitle}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Boycotting Reason Details */}
          <div>
            <label
              htmlFor="boycottReason"
              className="block text-lg font-medium text-gray-700"
            >
              Boycotting Reason Details
            </label>
            <textarea
              id="boycottReason"
              name="boycottReason"
              value={formData.boycottReason}
              onChange={handleInputChange}
              rows="4"
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Add Query Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Query
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddQueries;
