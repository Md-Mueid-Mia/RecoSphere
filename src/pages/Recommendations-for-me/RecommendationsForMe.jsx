import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RecommendationsForMe = () => {
  const axiosSecure = useAxiosSecure();
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      const response = await axiosSecure.get(
        `/recommendationForMe/${user?.email}`
      );
      console.log(response);
      setRecommendations(response?.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
    }
  };
  console.log(recommendations);

  return (
    <div className="p-5">
      <h2>Recommendations For Me</h2>
      {recommendations.length > 0 ? (
        <div className="overflow-x-auto">
          <div data-aos="zoom-in" data-aos-duration="1500">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th>S/L</th>
                  <th>Recommendation Title</th>
                  <th>Product Name</th>
                  <th>Reason</th>
                  <th>Recommended By</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((rec, index) => {
                  return (
                    <tr key={rec._id} className="hover">
                      <th>{index + 1}</th>
                      <td>{rec.recommendationTitle}</td>
                      <td>{rec.recommendedProductName}</td>
                      <td>{rec.recommendationReason}</td>
                      <td>{rec.recommenderName || "Anonymous"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div data-aos="zoom-in" data-aos-duration="1500">

            <p>No recommendations available for your queries.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsForMe;
