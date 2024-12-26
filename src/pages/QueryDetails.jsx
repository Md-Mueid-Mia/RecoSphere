import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosSecure } from "../hooks/useAxiosSecure";
import AuthContext from "../provider/AuthContext";
import toast from "react-hot-toast";

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
        console.log("No recommendations found.");
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Query Details</h1>

      <div className="hero bg-base-200 py-8 md:py-16">
      <div data-aos="zoom-in" data-aos-duration="1500">

        <div className="hero-content flex-col lg:flex-row items-center gap-12">
          
          <img
            referrerPolicy="no-referrer"
            src={productImageUrl}
            alt={productName}
            className="max-w-sm w-full rounded-lg shadow-xl object-cover"
          />
          <div className="flex flex-col space-y-6 w-full">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">
              {productName}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">{queryTitle}</p>
            <div className="text-gray-700 font-medium">
              Recommendations:{" "}
              <span className="text-blue-600">{recommendationCount}</span>
            </div>
            <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-4">
              {photo ? (
                <img
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full shadow-md"
                  src={photo}
                  alt={UserName}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                  N/A
                </div>
              )}
              <div className="text-gray-700">
                <div className="font-bold text-lg">{UserName}</div>
                <div className="text-sm text-gray-500">{email}</div>
                <div className="text-sm text-gray-500">
                  {postDate} {postTime}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  <strong>Brand:</strong> {productBrand}
                </div>
              </div>
            </div>
          </div>
        </div>
</div>
      </div>

      <h3 className="text-xl font-semibold my-4">All Recommendations ({recommendations.length? recommendations.length: '0'})</h3>
      <div className="space-y-4 mb-6">
      {recommendations.length > 0 ? (
      <div>
         {recommendations?.map((rec) => (
          <div key={rec._id} className="bg-white shadow-md p-4 rounded-md">
            <h4 className="text-lg font-semibold">{rec?.recommendationTitle}</h4>
            <img
              src={rec?.recommendedProductImage}
              alt={rec?.recommendedProductName}
              className="w-32 h-32 object-cover rounded-md my-2"
            />
            <p className="text-sm">
              <strong>Product:</strong> {rec?.recommendedProductName}
            </p>
            <p className="text-sm">
              <strong>Reason:</strong> {rec?.recommendationReason}
            </p>
            <p className="text-sm">
              <strong>By:</strong> {rec?.recommenderName} ({rec?.recommenderEmail}
              )
            </p>
            <p className="text-sm">
              <strong>On:</strong> {rec?.postedDate} {rec?.PostedTime}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p>No recommendations found.</p>
    )}
       
      </div>
      <hr className="my-6" /> <div data-aos="zoom-in" data-aos-duration="1500">

      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4 ">Add a Recommendation</h3>
        <div className="mb-4">
          <label
            htmlFor="recommendationTitle"
            className="block text-sm font-medium mb-1"
          >
            Recommendation Title
          </label>
          <input
            type="text"
            name="recommendationTitle"
            id="recommendationTitle"
            value={formData.recommendationTitle}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter recommendation title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="recommendedProductName"
            className="block text-sm font-medium mb-1"
          >
            Recommended Product Name
          </label>
          <input
            type="text"
            name="recommendedProductName"
            id="recommendedProductName"
            value={formData.recommendedProductName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="recommendedProductImage"
            className="block text-sm font-medium mb-1"
          >
            Recommended Product Image URL
          </label>
          <input
            type="url"
            name="recommendedProductImage"
            id="recommendedProductImage"
            value={formData.recommendedProductImage}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="recommendationReason"
            className="block text-sm font-medium mb-1"
          >
            Recommendation Reason
          </label>
          <textarea
            name="recommendationReason"
            id="recommendationReason"
            value={formData.recommendationReason}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Why do you recommend this product?"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Recommendation
        </button>
      </form>
</div>
    </div>
  );
};

export default QueryDetails;
