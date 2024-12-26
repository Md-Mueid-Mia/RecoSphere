import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../provider/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchAllRecommendations();
  }, []);

  const fetchAllRecommendations = async () => {
    axiosSecure.get(`/recommendation/${user?.email}`, {withCredentials:true})
    .then((response) => {
        console.log(response.data);
      setRecommendations(response.data);
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/recommendation/${id}`, {withCredentials:true})

          // .then((response) => console.log(response))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setRecommendations(recommendations.filter((rec) => rec._id !== id));
          });
      }
    });
  };
// console.log(recommendations);
  return (
    <div className="py-12 px-4">
      My Recommendations ({recommendations ? recommendations.length : 0})
      <div className="overflow-x-auto">
      <div data-aos="zoom-in" data-aos-duration="1500">

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>S/L</th>
              <th>Recommended Product Name</th>
              <th>Recommendation Title</th>
              <th>Date/Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((recommendation, index) => {
              return (
                <tr key={recommendation._id} className="hover">
                  <th>{index + 1}</th>
                  <td>{recommendation?.recommendedProductName}</td>
                  <td>{recommendation?.recommendationTitle}</td>
                  <td>
                    {recommendation.postedDate} {recommendation.PostedTime}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(recommendation._id)}
                      className="btn btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
</div>
      </div>
    </div>
  );
};

export default MyRecommendations;
