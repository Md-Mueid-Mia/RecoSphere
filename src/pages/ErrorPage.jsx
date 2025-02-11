// import React from "react";
// import { Link } from "react-router-dom";
// import { FaExclamationTriangle } from "react-icons/fa";

// const ErrorPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="text-center">
//         <FaExclamationTriangle className="text-red-500 mx-auto text-6xl mb-4" />
//         <h1 className="text-4xl font-bold mb-2 "><img className="mx-auto" src="https://i.ibb.co.com/dmmCnKq/Main-Scene.gif" alt="" /></h1>
//         <p className="text-xl  mb-6">
//           Oops! The page you’re looking for doesn’t exist.
//         </p>
//         <Link
//           to="/"
//           className="btn btn-primary px-6 py-2 rounded-lg shadow-md"
//         >
//           Go Back Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ErrorPage;


import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-purple-400 dark:text-purple-500 animate-pulse">
          404
        </h1>
        <div className="mb-8">
          <img
            className="mx-auto w-64 h-64 object-cover"
            src="https://i.ibb.co/dmmCnKq/Main-Scene.gif"
            alt="Error illustration"
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaHome className="text-xl" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;