import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateQuery = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const navigate = useNavigate();
  // console.log(id);

  useEffect(() => {
    getSingleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSingleData = () => {
    axiosSecure
      .get(`/query/${id}`)
      .then((response) => {
        setQuery(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const {
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




  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    const productName = form.productName.value;
    const productBrand = form.productBrand.value;
    const productImageUrl = form.productImageUrl.value;
    const queryTitle = form.queryTitle.value;
    const boycottReason = form.boycottReason.value;
    const postDate = postedDate;
    const postTime = PostedTime;

    const formData = {
        productName,
        productBrand,
        productImageUrl,
        queryTitle,
        boycottReason,
        postDate,
        postTime,
      };
    
    // console.log("Query Submitted:", formData);
    // Reset form
     axiosSecure.put(`/updateQuery/${id}`, formData)
    .then((data) => {
        if (data.data.modifiedCount) {
            toast.success("Query added successfully");
            navigate(`/my-queries`);
          }
    })
   
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
       <div data-aos="zoom-in" data-aos-duration="1500">

      <h2 className="text-2xl font-bold mb-6">Update Your Product Query</h2>
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
              defaultValue={productName}
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
              defaultValue={productBrand}
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
              defaultValue={productImageUrl}
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
              defaultValue={queryTitle}
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
              defaultValue={boycottReason}
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
              Update Query
            </button>
          </div>
        </div>
      </form>
</div>
    </div>
  );
};

export default UpdateQuery;
