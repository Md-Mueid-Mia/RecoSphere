// import React, { useContext, useEffect, useState } from "react";
// import AuthContext from "../../provider/AuthContext";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const MyRecommendations = () => {
//   const [recommendations, setRecommendations] = useState([]);
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     fetchAllRecommendations();
//   }, []);

//   const fetchAllRecommendations = async () => {
//     axiosSecure.get(`/recommendation/${user?.email}`, {withCredentials:true})
//     .then((response) => {
//         console.log(response.data);
//       setRecommendations(response.data);
//     });
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure
//           .delete(`/recommendation/${id}`, {withCredentials:true})

//           // .then((response) => console.log(response))
//           .then(() => {
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your file has been deleted.",
//               icon: "success",
//             });
//             setRecommendations(recommendations.filter((rec) => rec._id !== id));
//           });
//       }
//     });
//   };
// // console.log(recommendations);
//   return (
//     <div className="py-12 px-4">
//       My Recommendations ({recommendations ? recommendations.length : 0})
//       <div className="overflow-x-auto">
//       <div data-aos="zoom-in" data-aos-duration="1500">

//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>S/L</th>
//               <th>Recommended Product Name</th>
//               <th>Recommendation Title</th>
//               <th>Date/Time</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recommendations.map((recommendation, index) => {
//               return (
//                 <tr key={recommendation._id} className="hover">
//                   <th>{index + 1}</th>
//                   <td>{recommendation?.recommendedProductName}</td>
//                   <td>{recommendation?.recommendationTitle}</td>
//                   <td>
//                     {recommendation.postedDate} {recommendation.PostedTime}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(recommendation._id)}
//                       className="btn btn-error text-white"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
// </div>
//       </div>
//     </div>
//   );
// };

// export default MyRecommendations;
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../provider/AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { useTheme } from "../../provider/ThemeProvider";

const MyRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  useEffect(() => {
    fetchAllRecommendations();
  }, []);

  const fetchAllRecommendations = async () => {
    try {
      const response = await axiosSecure.get(`/recommendation/${user?.email}`, {
        withCredentials: true,
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
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
          .delete(`/recommendation/${id}`, { withCredentials: true })
          .then(() => {
            Swal.fire("Deleted!", "Recommendation has been deleted.", "success");
            fetchAllRecommendations();
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-10 px-4 md:px-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            My Recommendations
          </h1>
          <p className="text-lg opacity-80">
            Manage and track your product recommendations
          </p>
        </motion.div>

        {recommendations.length === 0 ? (
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
            <h3 className="text-xl font-semibold mb-2">No recommendations yet</h3>
            <p className="text-gray-500">
              Start by adding your first product recommendation
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-6 rounded-lg shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={recommendation.productImage || "/default-product.png"}
                      alt={recommendation.productName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">
                        {recommendation.productName}
                      </h3>
                      <p className="text-sm opacity-70">
                        {recommendation.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(recommendation._id)}
                      className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors duration-200"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-blue-100 text-blue-500 transition-colors duration-200">
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p
                  className={`text-sm mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {recommendation.description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      theme === "dark"
                        ? "bg-blue-900 text-blue-300"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {recommendation.status || "Active"}
                  </span>
                  <span className="text-xs opacity-50">
                    {new Date(recommendation.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecommendations;